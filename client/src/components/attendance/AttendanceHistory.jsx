import React from "react";
import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets";
import { format } from "date-fns";

export const AttendanceHistory = ({ history = [] }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "PRESENT":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "LATE":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "ABSENT":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Activity
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Date</th>
              <th className="px-6 py-3 text-left font-medium">Check In</th>
              <th className="px-6 py-3 text-left font-medium">Check Out</th>
              <th className="px-6 py-3 text-left font-medium">Working Hours</th>
              <th className="px-6 py-3 text-left font-medium">Day Type</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {history.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No record found
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record);

                return (
                  <tr
                    key={record._id || record.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </td>

                    <td className="px-6 py-4">
                      {record.checkIn
                        ? format(new Date(record.checkIn), "hh:mm a")
                        : "-"}
                    </td>

                    <td className="px-6 py-4">
                      {record.checkOut
                        ? format(new Date(record.checkOut), "hh:mm a")
                        : "-"}
                    </td>

                    <td className="px-6 py-4">
                      {getWorkingHoursDisplay(record)}
                    </td>

                    <td className="px-6 py-4">
                      {dayType.label !== "-" ? (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${dayType.className}`}
                        >
                          {dayType.label}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full border ${getStatusClass(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};