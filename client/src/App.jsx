import { Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"

import { LoginLanding } from "./pages/LoginLanding"
import { Layout } from "./pages/Layout"
import { Attendance } from "./pages/Attendance"
import { Dashboard } from "./pages/Dashboard"
import { Employee } from "./pages/Employee"
import { Payslips } from "./pages/Payslips"
import { Printpayslips } from "./pages/Printpayslips"
import { Setting } from "./pages/Setting"
import { Leave } from "./pages/Leave"
import { LoginForm } from "./components/LoginForm"
import AdminAttendanceReport from "./pages/AdminAttendanceReport"
import TodayAttendance from "./pages/TodayAttendance"

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Login Routes */}
        <Route
          path="/login"
          element={<LoginLanding />}
        />

        <Route
          path="/login/admin"
          element={
            <LoginForm
              role="admin"
              title="adminportal"
              subtitle="login to mange dashboard"
            />
          }
        />

        <Route
          path="/login/employee"
          element={
            <LoginForm
              role="employee"
              title="employee portal"
              subtitle="sign in to access your account"
            />
          }
        />

        {/* Protected Layout Routes */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/attendance"
            element={<Attendance />}
          />

          <Route
            path="/attendance-report"
            element={<AdminAttendanceReport />}
          />

          <Route
            path="/today-attendance"
            element={<TodayAttendance />}
          />

          <Route
            path="/employee"
            element={<Employee />}
          />

          <Route
            path="/leave"
            element={<Leave />}
          />

          <Route
            path="/payslips"
            element={<Payslips />}
          />

          <Route
            path="/setting"
            element={<Setting />}
          />
        </Route>

        {/* Print Payslip */}
        <Route
          path="/print/payslips/:id"
          element={<Printpayslips />}
        />

        {/* Default Route */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </>
  )
}

export default App