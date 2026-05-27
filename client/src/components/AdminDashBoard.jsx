import React from "react";
import {
  UsersIcon,
  Building2Icon,
  ClipboardCheckIcon,
  FileClockIcon,
} from "lucide-react";

import { Link } from "react-router-dom";

export const AdminDashBoard = ({ data }) => {
  const cards = [
    {
      title: "Active Workforce",
      value: data?.totalEmployees,
      description:
        "Employees currently working in the organization",
      icon: UsersIcon,
    },

    {
      title: "Departments",
      value: data?.totalDepartments,
      description:
        "Total departments in the company",
      icon: Building2Icon,
    },

    {
      title: "Today's Attendance",
      value: data?.todayAttendance,
      description:
        "Employees marked present today",
      icon: ClipboardCheckIcon,
      link: "/today-attendance",
    },

    {
      title: "Pending Leaves",
      value: data?.pendingLeaves,
      description:
        "Leave requests awaiting approval",
      icon: FileClockIcon,
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, Admin 👋
        </h1>

        <p className="text-slate-500">
          Here is what’s happening in your
          organization today.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;

          const CardContent = (
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>

                <div>
                  <p className="text-slate-500 text-sm">
                    {card.title}
                  </p>

                  <p className="text-2xl font-semibold">
                    {card.value}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-400">
                {card.description}
              </p>
            </div>
          );

          return card.link ? (
            <Link key={i} to={card.link}>
              {CardContent}
            </Link>
          ) : (
            <div key={i}>
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};