import React, { useState } from "react";
import { Plus, X } from "lucide-react";

export const GenratePaySlipsForm = ({ emoloyees, onSuccess }) => {
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

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const data = {
      employeeId: formData.get("employeeId"),
      month: formData.get("month"),
      year: formData.get("year"),
      basicSalary: Number(formData.get("basicSalary")),
      allowances: Number(formData.get("allowances")),
      deductions: Number(formData.get("deductions")),
    };

    console.log("Payslip Data:", data);

    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);
      onSuccess && onSuccess();
    }, 1000);
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <Plus size={16} />
        Generate Payslips
      </button>
    );

  return (
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

        <form onSubmit={handleSumbit} className="space-y-4">
          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Employee
            </label>
            <select
              name="employeeId"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Choose employee</option>
              {emoloyees?.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Month & Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Month
              </label>
              <select
                name="month"
                defaultValue={currentMonth}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {months.map((name, i) => (
                  <option key={i + 1} value={i + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Year
              </label>
              <select
                name="year"
                defaultValue={currentYear}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Allowances */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Allowances
            </label>
            <input
              type="number"
              name="allowances"
              placeholder="Enter total allowances"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Deductions */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Deductions
            </label>
            <input
              type="number"
              name="deductions"
              placeholder="Enter total deductions"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
  );
};