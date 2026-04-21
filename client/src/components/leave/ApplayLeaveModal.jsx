import React, { useState } from "react";

export const ApplayLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // yaha API ya parent call hoga
    onSuccess(form);

    setLoading(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 space-y-5 animate-fadeIn"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Apply Leave
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
          
          
          </div>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="SICK">Sick Leave</option>
            <option value="CASUAL">Casual Leave</option>
            <option value="PAID">Paid Leave</option>
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              name="startDate"
              min={minDate}
              value={form.startDate}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="date"
              name="endDate"
              min={form.startDate || minDate}
              value={form.endDate}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
            placeholder="Reason for leave..."
            className="w-full border rounded-lg px-3 py-2 h-24 resize-none"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Apply Leave"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};