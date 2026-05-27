import { Loader, Save, User } from "lucide-react";
import React, { useState } from "react";
import api from "../api/axios"

export const ProfileForm = ({ inisialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setMessage("");

  const formData = new FormData(e.currentTarget);

  try {
  await api.put("/profile", formData);
    setMessage("Profile updated successfully");
    onSuccess?.();
  } catch (err) {
    setError(err.response?.data?.error || err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-6 mb-6">
      <h2 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
        <User className="w-5 h-5 text-slate-400" />
        Public Profile
      </h2>

      {error && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm border border-rose-200 mb-6 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
          {error}
        </div>
      )}

      {message && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm border border-emerald-200 mb-6 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
          {message}
        </div>
      )}

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>
            <input
              disabled
              value={`${inisialData.firstName} ${inisialData.lastName}`}
              className="w-full bg-slate-50 text-slate-400 cursor-not-allowed border rounded-lg px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              disabled
              value={inisialData.email}
              className="w-full bg-slate-50 text-slate-400 cursor-not-allowed border rounded-lg px-3 py-2"
            />
          </div>

          {/* Position */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Position
            </label>
            <input
              disabled
              value={inisialData.position}
              className="w-full bg-slate-50 text-slate-400 cursor-not-allowed border rounded-lg px-3 py-2"
            />
          </div>

          {/* Bio */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bio
            </label>
            <textarea
              disabled={inisialData.isDeleted}
              name="bio"
              defaultValue={inisialData.bio || ""}
              placeholder="Write your bio..."
              className={`w-full resize-none border rounded-lg px-3 py-2 ${
                inisialData.isDeleted
                  ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                  : ""
              }`}
            />
            <p className="text-xs text-slate-500 mt-1">
              This will be displayed on your profile
            </p>
          </div>

          {/* Footer */}
          <div className="sm:col-span-2">
            {inisialData.isDeleted ? (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl text-sm">
                <p className="font-medium">Account Deactivated</p>
                <p>You can no longer update your profile.</p>
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};