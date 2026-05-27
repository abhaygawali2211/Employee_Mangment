import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { format } from "date-fns";

import {
  CalendarDays,
  Clock3,
  LogIn,
  LogOut,
  User2,
} from "lucide-react";

const TodayAttendance = () => {
  const [records, setRecords] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const fetchAttendance = async () => {
    try {
      const { data } = await api.get(
        `/attendance/today-attendance?date=${selectedDate}`
      );

      setRecords(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Present Employees
          </h1>

          <p className="text-gray-500 mt-1">
            Track employee attendance day wise
          </p>
        </div>

        {/* Date Picker */}
        <div className="bg-white border px-4 py-3 shadow-sm flex items-center gap-3 w-full sm:w-[320px]">
          <CalendarDays className="text-gray-500 size-5" />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            className="outline-none w-full bg-transparent text-gray-700"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Present
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {records.length}
          </h2>
        </div>

        <div className="bg-white border p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Checked In
          </p>

          <h2 className="text-3xl font-bold mt-2 text-emerald-600">
            {
              records.filter((r) => r.checkIn)
                .length
            }
          </h2>
        </div>

        <div className="bg-white border p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Checked Out
          </p>

          <h2 className="text-3xl font-bold mt-2 text-amber-600">
            {
              records.filter((r) => r.checkOut)
                .length
            }
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border shadow-sm overflow-x-auto">
        <table className="w-full min-w-[750px] text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">
                Employee
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Date
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Check In
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Check Out
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((r, index) => (
                <tr
                  key={r._id}
                  className={`border-b hover:bg-blue-50 transition ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2">
                        <User2 className="size-4 text-blue-600" />
                      </div>

                      <span className="font-medium text-gray-800">
                        {r.employeeId?.firstName}{" "}
                        {r.employeeId?.lastName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {format(
                      new Date(r.date),
                      "dd MMM yyyy"
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-emerald-600 font-medium">
                      <LogIn className="size-4" />

                      {r.checkIn
                        ? format(
                            new Date(r.checkIn),
                            "hh:mm a"
                          )
                        : "-"}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-amber-600 font-medium">
                      <LogOut className="size-4" />

                      {r.checkOut
                        ? format(
                            new Date(r.checkOut),
                            "hh:mm a"
                          )
                        : "-"}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold ${
                        r.status === "PRESENT"
                          ? "bg-emerald-100 text-emerald-700"
                          : r.status === "ABSENT"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-16"
                >
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Clock3 className="size-10 mb-3" />

                    <p className="text-lg font-medium">
                      No attendance found
                    </p>

                    <p className="text-sm">
                      No employee checked in on this date
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayAttendance;