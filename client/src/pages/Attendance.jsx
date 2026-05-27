import { useCallback, useEffect, useState } from "react";
import { dummyAttendanceData } from "../assets/assets";
import { Loading } from "../components/Loading";
import { CheckInButton } from "../components/attendance/CheckInButton";
import { AttendanceStats } from "../components/attendance/AttendanceStats";
import { AttendanceHistory } from "../components/attendance/AttendanceHistory";
import api from '../api/axios'
import {toast} from "react-hot-toast"

export const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
     const res = await api.get("/attendance/history")
      const json= res.data
      setHistory(json.data|| [])
      if(json.employee?.isDeleted)setIsDeleted(true)
    } catch (error) {
      toast.error(error?.response?.data?.error|| error?.message)
    }finally{
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString()
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-40 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Attendance
        </h1>
        <p className="text-gray-500 mt-1">
          Track your work hours and daily check-ins
        </p>
      </div>

      {/* Floating Check Button */}
      {!isDeleted && (
        <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
      )}

      {/* Deleted Message */}
      {isDeleted && (
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          <p className="text-rose-600">
            You can no longer clock in or out because your employee records have
            been marked as deleted.
          </p>
        </div>
      )}

      {/* Stats + History */}
      <div className="space-y-6">
        <AttendanceStats history={history} />
        <AttendanceHistory history={history} />
      </div>
    </div>
  );
};