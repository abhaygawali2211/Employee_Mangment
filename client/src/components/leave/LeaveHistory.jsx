import { format } from "date-fns";
import { Check, Loader2, X } from "lucide-react";
import React, { useState } from "react";

export const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);
  };

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {isAdmin && (
              <th className="px-4 py-3 text-left">Employee</th>
            )}
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Dates</th>
            <th className="px-4 py-3 text-left">Reason</th>
            <th className="px-4 py-3 text-left">Status</th>
            {isAdmin && (
              <th className="px-4 py-3 text-left">Action</th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y">
          {leaves.length === 0 ? (
            <tr>
              <td
                colSpan={isAdmin ? 6 : 5}
                className="text-center py-8 text-gray-500"
              >
                No leave application found
              </td>
            </tr>
          ) : (
            leaves.map((leave) => (
              <tr key={leave._id || leave.id} className="hover:bg-gray-50">
                {isAdmin && (
                  <td className="px-4 py-3">
                    {leave.employee?.firstName}{" "}
                    {leave.employee?.lastName}
                  </td>
                )}

                <td className="px-4 py-3">{leave.type}</td>

                <td className="px-4 py-3">
                  {format(new Date(leave.startDate), "MMM dd")} -{" "}
                  {format(new Date(leave.endDate), "MMM dd, yyyy")}
                </td>

                <td className="px-4 py-3">{leave.reason}</td>

                {/* ✅ Status badge colors */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full border font-medium
                      ${
                        leave.status === "APPROVED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : leave.status === "REJECTED"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                  >
                    {leave.status}
                  </span>
                </td>

                {isAdmin && (
                  <td className="px-4 py-3">
                    {leave.status === "PENDING" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              leave._id || leave.id,
                              "APPROVED"
                            )
                          }
                          disabled={processing === (leave._id || leave.id)}
                          className="p-2 border rounded-md hover:bg-emerald-50"
                        >
                          {processing === (leave._id || leave.id) ? (
                            <Loader2 className="animate-spin size-4" />
                          ) : (
                            <Check className="size-4 text-emerald-600" />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              leave._id || leave.id,
                              "REJECTED"
                            )
                          }
                          disabled={processing === (leave._id || leave.id)}
                          className="p-2 border rounded-md hover:bg-rose-50"
                        >
                          {processing === (leave._id || leave.id) ? (
                            <Loader2 className="animate-spin size-4" />
                          ) : (
                            <X className="size-4 text-rose-600" />
                          )}
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};