import { format } from "date-fns";
import React from "react";
import { Download } from "lucide-react";

export const PayslipsList = ({ payslips, isAdmin }) => {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            {isAdmin && (
              <th className="px-6 py-3 text-left">Employee</th>
            )}
            <th className="px-6 py-3 text-left">Period</th>
            <th className="px-6 py-3 text-left">Basic Salary</th>
            <th className="px-6 py-3 text-left">Net Salary</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {payslips.length === 0 ? (
            <tr>
              <td
                colSpan={isAdmin ? 5 : 4}
                className="text-center py-10 text-gray-400 font-medium"
              >
                No payslips found
              </td>
            </tr>
          ) : (
            payslips.map((payslip) => (
              <tr
                key={payslip._id || payslip.id}
                className="hover:bg-gray-50 transition"
              >
                {isAdmin && (
                  <td className="px-6 py-4 font-medium">
                    {payslip.employee?.firstName}{" "}
                    {payslip.employee?.lastName}
                  </td>
                )}

                <td className="px-6 py-4">
                  {format(
                    new Date(payslip.year, payslip.month - 1),
                    "MMMM yyyy"
                  )}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-800">
                  ${payslip.basicSalary?.toLocaleString()}
                </td>

                <td className="px-6 py-4 font-semibold text-green-600">
                  ${payslip.netSalary?.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      window.open(
                        `/print/payslips/${payslip._id || payslip.id}`
                      )
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};