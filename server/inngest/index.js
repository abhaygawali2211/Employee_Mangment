import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import sendEmail from "../config/nodemailer.js";

export const inngest = new Inngest({ id: "full-stack-ems" });

/* ---------------- AUTO CHECKOUT ---------------- */

const autoCheckOut = inngest.createFunction(
  {
    id: "auto-check-out",
    triggers: [{ event: "employee/check-out" }],
  },
  async ({ event, step }) => {
    const { employeeId, attendanceId } = event.data;

    await step.sleepUntil(
      "wait-for-9-hours",
      new Date(Date.now() + 9 * 60 * 60 * 1000)
    );

    let attendance = await Attendance.findById(attendanceId);

    if (!attendance?.checkOut) {
      const employee = await Employee.findById(employeeId);
      await sendEmail({
        to:employee.email,
        subject:"Attendence Checkout Reminder",
        body:`  
        <div style="max-width: 600px; font-family: Arial, sans-serif;">
          <h2>Hi ${employee.firstName} 👋</h2>

          <p style="font-size: 16px;">
            You have a check-in in <b>${employee.department}</b> today:
          </p>

          <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">
            ${attendance?.checkIn?.toLocaleTimeString()}
          </p>

          <p style="font-size: 16px;">
            Please make sure to check-out in one hour.
          </p>

          <p style="font-size: 16px;">
            If you have any questions, please contact your admin.
          </p>

          <br />

          <p style="font-size: 16px;">Best Regards,</p>
          <p style="font-size: 16px;">EMS</p>
        </div>
      `
      })

      await step.sleepUntil(
        "wait-for-1-hour",
        new Date(Date.now() + 1 * 60 * 60 * 1000)
      );

      attendance = await Attendance.findById(attendanceId);

      if (!attendance?.checkOut) {
        attendance.checkOut = new Date(
          attendance.checkIn.getTime() + 4 * 60 * 60 * 1000
        );
        attendance.workingHours = 4;
        attendance.dayType = "Half Day";
        attendance.status = "LATE";
        await attendance.save();
      }
    }
  }
);

/* ---------------- LEAVE REMINDER ---------------- */

const leaveApplicationReminder = inngest.createFunction(
  {
    id: "leave-application-reminder",
    triggers: [{ event: "leave/pending" }],
  },
  async ({ event, step }) => {
    const { leaveApplicationId } = event.data;

    await step.sleepUntil(
      "wait-24-hours",
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    const leaveApplication = await LeaveApplication.findById(
      leaveApplicationId
    );

    if (leaveApplication?.status === "PENDING") {
      const employee = await Employee.findById(
        leaveApplication.employeeId);

        await sendEmail({
          to:process.env.ADMIN_EMAIL,
          subject:"Leave Application Rwminder",
          body: `<div style="max-width: 600px; font-family: Arial, sans-serif;">
          <h2>Hi Admin, 👋</h2>

          <p style="font-size: 16px;">
            You have a leave application in <b>${employee.department}</b> today:
          </p>

          <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">
            ${leaveApplication?.startDate?.toLocaleDateString()}
          </p>

          <p style="font-size: 16px;">
            Please make sure to take action on this leave application.
          </p>

          <br />

          <p style="font-size: 16px;">Best Regards,</p>
          <p style="font-size: 16px;">EMS</p>
        </div>
      `
        })
    }
  }
);

/* ---------------- ATTENDANCE CRON ---------------- */

const attendanceReminderCron = inngest.createFunction(
  {
    id: "attendance-reminder-cron",
    triggers:[{ cron: "0 6 * * *" }],
  },
  async ({ step }) => {
    const today = await step.run("get-today-date", () => {
      const startUTC = new Date(
        new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        }) + "T00:00:00+05:30"
      );

      const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);

      return {
        startUTC: startUTC.toISOString(),
        endUTC: endUTC.toISOString(),
      };
    });

    const activeEmployees = await step.run(
      "get-active-employees",
      async () => {
        const employee = await Employee.find({
          isDeleted: false,
          employmentStatus: "ACTIVE",
        }).lean();

        return employee.map((e) => ({
          _id: e._id.toString(),
          firstName: e.firstName,
          lastName: e.lastName,
          email: e.email,
          department: e.department,
        }));
      }
    );

    const onLeaveIds = await step.run("get-on-leave-ids", async () => {
      const leaves = await LeaveApplication.find({
        status: "APPROVED",
        startDate: { $lte: new Date(today.endUTC) },
        endDate: { $gte: new Date(today.startUTC) },
      }).lean();

      return leaves.map((L) => L.employeeId.toString());
    });

    const checkedINids = await step.run("get-checked-in-ids", async () => {
      const attendances = await Attendance.find({
        date: {
          $gte: new Date(today.startUTC),
          $lt: new Date(today.endUTC),
        },
      }).lean();

      return attendances.map((a) => a.employeeId.toString());
    });

    const absentEmployees = activeEmployees.filter(
      (emp) =>
        !onLeaveIds.includes(emp._id) &&
        !checkedINids.includes(emp._id)
    );

    if (absentEmployees.length > 0) {
      await step.run("send-reminder-emails", async () => {
        const emailPromises = absentEmployees.map((emp) => {

          sendEmail({
            to:emp.email,
            subject:`Attendance Reminder -pleasae mark your Attendance`,
            body:` <div style="max-width: 600px; font-family: Arial, sans-serif;">
  <h2>Hi ${emp.firstName}, 👋</h2>

  <p style="font-size: 16px;">
    We noticed you haven't marked your attendance yet today.
  </p>

  <p style="font-size: 16px;">
    The deadline was <strong>11:30 AM</strong> and your attendance is still missing.
  </p>

  <p style="font-size: 16px;">
    Please check in as soon as possible or contact your admin if you're facing any issues.
  </p>

  <br />

  <p style="font-size: 14px; color: #666;">
    Department: ${emp.department}
  </p>

  <br />

  <p style="font-size: 16px;">Best Regards,</p>
  <p style="font-size: 16px;"><strong>QuickEMS</strong></p>
</div> `
          })
        });
        await Promise.all(emailPromises)
      });
    }

    return {
      totalActive: activeEmployees.length,
      onLeave: onLeaveIds.length,
      checkedIn: checkedINids.length,
      absent: absentEmployees.length,
    };
  }
);

export const functions = [
  autoCheckOut,
  leaveApplicationReminder,
  attendanceReminderCron,
];
