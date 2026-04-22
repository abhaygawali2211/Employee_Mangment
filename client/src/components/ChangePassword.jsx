import { LockIcon } from "lucide-react";
import React, { useState } from "react";

export const ChangePassword = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2 bg-slate-100 rounded-lg">
            <LockIcon className="w-5 h-5 text-slate-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">
            Change Password
          </h2>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Confirm new password"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-sm hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800 disabled:opacity-60"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};