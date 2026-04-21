import React, { useEffect, useState, useCallback } from "react";
import { dummyLeaveData } from "../assets/assets";
import { Loading } from "../components/Loading";
import {
  PaletteIcon,
  PlusIcon,
  ThermometerIcon,
  UmbrellaIcon,
} from "lucide-react";
import { LeaveHistory } from "../components/leave/LeaveHistory";
import { ApplayLeaveModal } from "../components/leave/ApplayLeaveModal";

export const Leave = () => {
  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const isAdmin = false;

  const fetchLeaves = useCallback(() => {
    setLeave(dummyLeaveData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  if (loading) return <Loading />;

  // ✅ Correct calculations
  const approvedLeaves = leave.filter((l) => l.status === "APPROVED");

  const sickCount = approvedLeaves.filter((l) => l.type === "SICK").length;
  const casualCount = approvedLeaves.filter((l) => l.type === "CASUAL").length;
  const annualCount = approvedLeaves.filter((l) => l.type === "ANNUAL").length;

  const leaveStats = [
    { label: "Sick Leave", value: sickCount, icon: ThermometerIcon },
    { label: "Casual Leave", value: casualCount, icon: UmbrellaIcon },
    { label: "Annual Leave", value: annualCount, icon: PaletteIcon },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Leave Management
          </h1>
          <p className="text-gray-500 mt-1">
            {isAdmin ? "Manage leave applications" : "Your leave history"}
          </p>
        </div>

        {!isAdmin && !isDeleted && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-md transition"
          >
            <PlusIcon size={18} />
            Apply for Leave
          </button>
        )}
      </div>

      {/* Stats Cards */}
      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {leaveStats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition"
            >
              <div className="p-3 rounded-xl bg-gray-100">
                <s.icon className="size-6 text-indigo-600" />
              </div>

              <div>
                <p className="text-gray-500 text-sm">{s.label}</p>
                <p className="text-xl font-semibold text-gray-800">
                  {s.value} <span className="text-sm font-normal">taken</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <LeaveHistory leaves={leave} isAdmin={isAdmin} onUpdate={fetchLeaves}/>
      <ApplayLeaveModal open={showModal} onClose={()=> setShowModal(false)} onSuccess={fetchLeaves}/>
    </div>
  );
};