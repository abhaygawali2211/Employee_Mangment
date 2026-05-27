// import { inngest } from "../inngest/index.js"
// import Attendance from "../models/Attendance.js"
// import Employee from "../models/Employee.js"

// export const clockInOut = async (req, res) => {
//   try {
//     const session = req.session

//     const employee = await Employee.findOne({ userId: session.userId })
//     if (!employee || employee.isDeleted) {
//       return res.status(403).json({
//         error: "Your account is deactivated. You cannot clock in/out",
//       })
//     }

//     // Aaj ki date (00:00:00)
//     const today = new Date()
//     today.setHours(0, 0, 0, 0)

//     const existing = await Attendance.findOne({
//       employeeId: employee._id,
//       date: today,
//     })

//     const now = new Date()

//     // ✅ FIRST TIME = CHECK IN
//     if (!existing) {
//       const isLate = now.getHours() >= 9 && now.getMinutes() > 0

//       const attendance = await Attendance.create({
//         employeeId: employee._id,
//         date: today,
//         checkIn: now,
//         status: isLate ? "LATE" : "PRESENT",
//       })

// await inngest.send({
//   name:"employee/check-out",
//   data:{
//     employeeId:employee._id,
//     attendanceId: attendance._id
//   }
// })

//       return res.json({
//         success: true,
//         type: "CHECK_IN",
//         data: attendance,
//       })
//     }

//     // ✅ SECOND TIME = CHECK OUT
//     if (!existing.checkOut) {
//       const checkInTime = new Date(existing.checkIn).getTime()
//       const diffMs = now.getTime() - checkInTime
//       const diffHours = diffMs / (1000 * 60 * 60)

//       const workingHours = parseFloat(diffHours.toFixed(2))

//       let dayType = "Half Day"
//       if (workingHours >= 8) dayType = "Full Day"
//       else if (workingHours >= 6) dayType = "Three Quarter Day"
//       else if (workingHours >= 4) dayType = "Half Day"
//       else dayType = "Short Day"

//       existing.checkOut = now
//       existing.workingHours = workingHours
//       existing.dayType = dayType

//       await existing.save()

//       return res.json({
//         success: true,
//         type: "CHECK_OUT",
//         data: existing,
//       })
//     }

//     // ✅ Already checked out
//     return res.json({
//       success: false,
//       message: "You have already checked out today",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Clock in/out failed" })
//   }
// }

// export const getAttendance = async (req, res) => {
//   try {
//     const session = req.session

//     const employee = await Employee.findOne({ userId: session.userId })
//     if (!employee) {
//       return res.status(404).json({ error: "Employee not found" })
//     }

//     const limit = parseInt(req.query.limit) || 30

//     const history = await Attendance.find({ employeeId: employee._id })
//       .sort({ date: -1 })   // latest first
//       .limit(limit)

//     return res.json({
//       data: history,
//       employee: { isDeleted: employee.isDeleted }
//     })
//   } catch (error) {
//     return res.status(500).json({ error: "Failed to fetch attendance" })
//   }
// }

import { inngest } from "../inngest/index.js"
import Attendance from "../models/Attendance.js"
import Employee from "../models/Employee.js"

// ================= CLOCK IN / OUT =================
export const clockInOut = async (req, res) => {
  try {
    const session = req.session

    const employee = await Employee.findOne({
      userId: session.userId,
    })

    if (!employee || employee.isDeleted) {
      return res.status(403).json({
        error:
          "Your account is deactivated. You cannot clock in/out",
      })
    }

    // ✅ Today Start & End Time
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    // ✅ Find today's attendance only
    const existing = await Attendance.findOne({
      employeeId: employee._id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })

    const now = new Date()

    // ✅ FIRST TIME = CHECK IN
    if (!existing) {
      const attendance = await Attendance.create({
        employeeId: employee._id,
        date: startOfDay,
        checkIn: now,
        status: "PRESENT",
      })

      await inngest.send({
        name: "employee/check-out",
        data: {
          employeeId: employee._id,
          attendanceId: attendance._id,
        },
      })

      return res.json({
        success: true,
        type: "CHECK_IN",
        data: attendance,
      })
    }

    // ✅ SECOND TIME = CHECK OUT
    if (!existing.checkOut) {
      const checkInTime = new Date(
        existing.checkIn
      ).getTime()

      const diffMs = now.getTime() - checkInTime

      const diffHours =
        diffMs / (1000 * 60 * 60)

      const workingHours = parseFloat(
        diffHours.toFixed(2)
      )

      let dayType = "Short Day"

      // ✅ Working Hours Logic
      if (workingHours >= 9) {
        dayType = "Full Day"
        existing.status = "PRESENT"
      } else if (workingHours >= 6) {
        dayType = "Three Quarter Day"
        existing.status = "PRESENT"
      } else if (workingHours >= 4) {
        dayType = "Half Day"
        existing.status = "PRESENT"
      } else {
        dayType = "Short Day"
        existing.status = "ABSENT"
      }

      existing.checkOut = now
      existing.workingHours = workingHours
      existing.dayType = dayType

      await existing.save()

      return res.json({
        success: true,
        type: "CHECK_OUT",
        data: existing,
      })
    }

    // ✅ Already checked out
    return res.json({
      success: false,
      message: "You have already checked out today",
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: "Clock in/out failed",
    })
  }
}

// ================= GET EMPLOYEE ATTENDANCE =================
export const getAttendance = async (req, res) => {
  try {
    const session = req.session

    const employee = await Employee.findOne({
      userId: session.userId,
    })

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      })
    }

    const limit =
      parseInt(req.query.limit) || 30

    const history = await Attendance.find({
      employeeId: employee._id,
    })
      .sort({ date: -1 })
      .limit(limit)

    return res.json({
      data: history,
      employee: {
        isDeleted: employee.isDeleted,
      },
    })
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch attendance",
    })
  }
}

// ================= TODAY ATTENDANCE =================
export const getTodayAttendance = async (req, res) => {
  try {
    // ✅ Frontend se selected date ayegi
    const { date } = req.query

    // ✅ Agar date select nahi ki to today
    const selectedDate = date
      ? new Date(date)
      : new Date()

    // ✅ Start of day
    const startOfDay = new Date(selectedDate)

    startOfDay.setHours(0, 0, 0, 0)

    // ✅ End of day
    const endOfDay = new Date(selectedDate)

    endOfDay.setHours(23, 59, 59, 999)

    // ✅ Attendance fetch
    const data = await Attendance.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },

      // ✅ Sirf present users
      status: {
        $in: ["PRESENT", "LATE"],
      },
    })
      .populate("employeeId")
      .sort({ checkIn: -1 })

    return res.json({
      success: true,
      data,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: "Failed to fetch attendance",
    })
  }
}