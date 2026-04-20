import { ArrowRightIcon, CalendarIcon, DollarSignIcon, FileTextIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const EmployeeDashboard = ({ data }) => {
  const emp = data?.employee;

  const cards = [
    {
      icon: CalendarIcon,
      value: data?.currentMonthAttendance,
      subtitle: "This month",
    },
    {
      icon: FileTextIcon,
      value: data?.pendingLeaves,
      subtitle: "Awaiting approval",
    },
    {
      icon: DollarSignIcon,
      value: data?.latestPayslips
        ? `₹${data.latestPayslips.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Net Salary",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          Welcome, {emp?.firstName}!
        </h1>
        <p className="page-subtitle">
          {emp?.position} — {emp?.department || "No Department"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-6 flex items-center gap-4"
            >
              <Icon className="w-10 h-10 text-blue-500" />
              <div>
                {card.title && (
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>
                )}
                <p className="text-2xl font-semibold">
                  {card.value}
                </p>
                <p className="text-sm text-slate-400">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

     <div className="flex flex-col sm:flex-row gap-4 mt-6">
  <Link
    to="/attendance"
    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
  >
    Mark Attendance
    <ArrowRightIcon className="w-4 h-4" />
  </Link>

  <Link
    to="/leave"
    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
  >
    Apply for Leave
  </Link>
</div>
    </div>
  );
};