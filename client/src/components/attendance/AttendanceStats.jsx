import {
  AlertCircleIcon,
  CalculatorIcon,
  ClockIcon,
} from "lucide-react";
import React from "react";

export const AttendanceStats = ({ history = [] }) => {
  const totalPresent = history.filter(
    (h) => h.status === "PRESENT" || h.status === "LATE"
  ).length;

  const totalLate = history.filter(
    (h) => h.status === "LATE"
  ).length;

  const stats = [
    { label: "Days Present", value: totalPresent, icon: CalculatorIcon },
    { label: "Late Arrivals", value: totalLate, icon: AlertCircleIcon },
    { label: "Avg. Work Hrs", value: "9 Hrs", icon: ClockIcon },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center justify-between p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
        >
          <div>
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-semibold text-gray-800">
              {s.value}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-gray-100">
            <s.icon className="size-6 text-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};