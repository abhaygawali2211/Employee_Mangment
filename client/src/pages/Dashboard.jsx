import { useEffect, useState } from "react";
import {
  dummyAdminDashboardData,
  dummyEmployeeDashboardData,
} from "../assets/assets";
import { Loading } from "../components/Loading";
import { EmployeeDashboard } from "../components/EmployeeDashboard";
import { AdminDashBoard } from "../components/AdminDashBoard";

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 yaha role decide karo
    const role = "ADMIN"; // test ke liye

    if (role === "ADMIN") {
      setData(dummyAdminDashboardData);
    } else {
      setData(dummyEmployeeDashboardData);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  if (!data)
    return (
      <p className="text-center text-slate-500 py-12">
        Failed to load
      </p>
    );

  if (data.role === "ADMIN") {
    return <AdminDashBoard/>;
  }

  return <EmployeeDashboard data={data} />;
};