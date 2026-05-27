import React, { useCallback, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { PayslipsList } from "../components/payslips/PayslipsList";
import { GenratePaySlipsForm } from "../components/payslips/GenratePaySlipsForm";
import { useAuth } from "../context/Authcontext";
import api from "../api/axios";
import { toast } from "react";

export const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  // ✅ Fetch payslips
  const fetchPayslips = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/payslips");
      setPayslips(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ First load
  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  // ✅ Fetch employees only if admin
 useEffect(() => {
  if (isAdmin)
    api
      .get("/employees")
      .then((res) =>
        setEmployees(res.data.filter((e) => !e.isDeleted))
      )
      .catch((i) => {});
}, [isAdmin]);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payslips</h1>
          <p className="text-gray-500 mt-1">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslips history"}
          </p>
        </div>

        {isAdmin && (
          <GenratePaySlipsForm
            employees={employees}
            onSuccess={fetchPayslips}
          />
        )}
      </div>

      {/* Table */}
      <PayslipsList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
};