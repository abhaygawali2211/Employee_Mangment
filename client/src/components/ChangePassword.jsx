import { LockIcon } from "lucide-react";
import React, { useState } from "react";
import api from "../api/axios"; // your axios instance

export const ChangePassword = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    // ✅ validation
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (!data.success) {
        throw new Error(data.error || "Failed");
      }

      e.target.reset();
      setMessage({ type: "success", text: "Password changed successfully" });
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.error || error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5"
      >
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2 bg-slate-100 rounded-lg">
            <LockIcon className="w-5 h-5 text-slate-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">
            Change Password
          </h2>
        </div>

        {/* ✅ FORM */}
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">New Password</label>
            <input
              name="newPassword"
              type="password"
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {message.text && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};