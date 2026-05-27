import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { format } from "date-fns";

const AdminAttendanceReport = () => {

  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [month, setMonth] = useState(
    new Date().getMonth() + 1
  );

  const [year, setYear] = useState(
    new Date().getFullYear()
  );

  const [employeeId, setEmployeeId] = useState("");

  // FETCH REPORT
  const fetchReport = async () => {

    try {

      if (!employeeId) {
        setRecords([]);
        return;
      }

      let url =
        `/admin/attendance/monthly-report?month=${month}&year=${year}&employeeId=${employeeId}`;

      const { data } = await api.get(url);

      setRecords(data.data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH EMPLOYEES
 const fetchEmployees = async () => {

  try {

    const { data } = await api.get("/employees");

    setEmployees(data || []);

  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchReport();
  }, [month, year, employeeId]);

  return (
    <div className="p-6 print:p-0 print:bg-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 print:hidden">

        <h1 className="text-2xl font-bold">
          Attendance Report
        </h1>

        <button
          onClick={() => window.print()}
          disabled={!employeeId}
          className={`px-4 py-2 rounded-lg text-white ${
            !employeeId
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black"
          }`}
        >
          Print Report
        </button>

      </div>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6 flex-wrap print:hidden">

        {/* MONTH */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded-lg"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              Month {i + 1}
            </option>
          ))}
        </select>

        {/* YEAR */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded-lg"
        >
          {[2025, 2026, 2027].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* EMPLOYEE */}
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2 rounded-lg min-w-[220px]"
        >

          <option value="">
            Select Employee
          </option>

          {employees.map((emp) => (

            <option
              key={emp._id}
              value={emp._id}
            >
              {emp.firstName} {emp.lastName}
            </option>

          ))}

        </select>

      </div>

      {/* PRINT TITLE */}
      {employeeId && (
        <div className="hidden print:block mb-6">

          <h1 className="text-2xl font-bold text-center">
            Attendance Report
          </h1>

          <p className="text-center text-gray-500 mt-2">
            {format(
              new Date(year, month - 1),
              "MMMM yyyy"
            )}
          </p>

        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-auto print:overflow-visible print:shadow-none print:border-none">

        <table className="w-full text-sm border-collapse">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-3 border">
                Employee
              </th>

              <th className="text-left p-3 border">
                Date
              </th>

              <th className="text-left p-3 border">
                Check In
              </th>

              <th className="text-left p-3 border">
                Check Out
              </th>

              <th className="text-left p-3 border">
                Hours
              </th>

              <th className="text-left p-3 border">
                Day Type
              </th>

              <th className="text-left p-3 border">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            {records.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500 border"
                >
                  Select employee to view report
                </td>
              </tr>

            ) : (

              records.map((r) => (

                <tr
                  key={r._id}
                  className="border-t"
                >

                  <td className="p-3 border">
                    {r.employeeId?.firstName}{" "}
                    {r.employeeId?.lastName}
                  </td>

                  <td className="p-3 border">
                    {format(
                      new Date(r.date),
                      "dd MMM yyyy"
                    )}
                  </td>

                  <td className="p-3 border">
                    {r.checkIn
                      ? format(
                          new Date(r.checkIn),
                          "hh:mm a"
                        )
                      : "-"}
                  </td>

                  <td className="p-3 border">
                    {r.checkOut
                      ? format(
                          new Date(r.checkOut),
                          "hh:mm a"
                        )
                      : "-"
                    }
                  </td>

                  <td className="p-3 border">
                    {r.workingHours || "-"}
                  </td>

                  <td className="p-3 border">
                    {r.dayType || "-"}
                  </td>

                  <td className="p-3 border">
                    {r.status}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminAttendanceReport;