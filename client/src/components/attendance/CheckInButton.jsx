import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);
   try {
    await api.post("/attendance/clock")
    onAction()
   } catch (error) {
    toast.error(error?.response?.data?.error||error?.message)
   }
   setLoading(false)
  };

  if (todayRecord?.checkOut) {
    return (
      <div className="text-center p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
        <h3 className="text-lg font-semibold text-emerald-700">
          Work Day Completed
        </h3>
        <p className="text-sm text-emerald-600 mt-1">
          Great job! See you tomorrow.
        </p>
      </div>
    );
  }

  const isCheckedIn = !!todayRecord?.checkIn;

  const baseClasses =
    "flex items-center gap-4 px-6 py-4 rounded-2xl shadow-xl border transition-all duration-200 w-[92vw] sm:w-auto";

  const stateClasses = isCheckedIn
    ? "bg-amber-50 border-amber-200"
    : "bg-emerald-50 border-emerald-200";

  const iconColor = isCheckedIn ? "text-amber-600" : "text-emerald-600";

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`${baseClasses} ${stateClasses}`}
      >
        <div className={iconColor}>
          {loading ? (
            <Loader2Icon className="animate-spin size-7" />
          ) : isCheckedIn ? (
            <LogOutIcon className="size-7" />
          ) : (
            <LogInIcon className="size-7" />
          )}
        </div>

        <div className="text-left">
          <h2 className="text-base font-semibold text-gray-800 capitalize">
            {loading ? "Processing" : isCheckedIn ? "Clock Out" : "Clock In"}
          </h2>
          <p className="text-sm text-gray-500">
            {isCheckedIn ? "Click to end your shift" : "Start your work day"}
          </p>
        </div>
      </button>
    </div>
  );
};