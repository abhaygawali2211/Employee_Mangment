import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

export const GenratePaySlipsForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post("/payslips", data);
      toast.success("Payslip generated");
      setIsOpen(false);
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <Plus size={16} />
        Generate Payslip
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Generate Payslip
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Employee */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Select Employee
                </label>
                <select
                  name="employeeId"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Choose employee</option>
                  {employees?.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month & Year */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="month"
                  defaultValue={currentMonth}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  {months.map((name, i) => (
                    <option key={i + 1} value={i + 1}>
                      {name}
                    </option>
                  ))}
                </select>

                <select
                  name="year"
                  defaultValue={currentYear}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary */}
              <input
                type="number"
                name="basicSalary"
                placeholder="Basic Salary"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              <input
                type="number"
                name="allowances"
                placeholder="Allowances"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              <input
                type="number"
                name="deductions"
                placeholder="Deductions"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};