import React, { useState } from "react";
import { DEPARTMENTS } from "../assets/assets";

export const Employeefrom = ({ inisialData, onSuccess, onCancel }) => {
  const [loading, setloading] = useState(false);

  const isEditMode = !!inisialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-8 max-h-[80vh] overflow-y-auto"
    >

      {/* ================= Personal Information ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="text-sm mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              defaultValue={inisialData?.firstName}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={inisialData?.lastName}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              defaultValue={inisialData?.phone}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Join Date</label>
            <input
              type="date"
              name="joinDate"
              defaultValue={
                inisialData?.joinDate
                  ? new Date(inisialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm mb-1">Bio</label>
            <textarea
              name="bio"
              defaultValue={inisialData?.bio}
              className="border rounded-lg px-3 py-2"
            />
          </div>

        </div>
      </div>

      {/* ================= Employment Details ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Employment Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="text-sm mb-1">Department</label>
            <select
              name="department"
              defaultValue={inisialData?.department || ""}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Position</label>
            <input
              type="text"
              name="position"
              defaultValue={inisialData?.position}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              defaultValue={inisialData?.basicSalary}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Allowances</label>
            <input
              type="number"
              name="allowances"
              defaultValue={inisialData?.allowances}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Deductions</label>
            <input
              type="number"
              name="deductions"
              defaultValue={inisialData?.deductions}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          {isEditMode && (
            <div className="flex flex-col">
              <label className="text-sm mb-1">Employment Status</label>
              <select
                name="employmentStatus"
                defaultValue={inisialData?.employmentStatus || "ACTIVE"}
                className="border rounded-lg px-3 py-2"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          )}

        </div>
      </div>

      {/* ================= Account Details ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Account Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="text-sm mb-1">Work Email</label>
            <input
              type="email"
              name="email"
              defaultValue={inisialData?.email}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          {!isEditMode && (
            <div className="flex flex-col">
              <label className="text-sm mb-1">Temporary Password</label>
              <input
                type="password"
                name="password"
                className="border rounded-lg px-3 py-2"
              />
            </div>
          )}

          {isEditMode && (
            <div className="flex flex-col">
              <label className="text-sm mb-1">Change Password</label>
              <input
                type="password"
                name="password"
                className="border rounded-lg px-3 py-2"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-sm mb-1">System Role</label>
            <select
              name="role"
              defaultValue={inisialData?.user?.role || "EMPLOYEE"}
              className="border rounded-lg px-3 py-2"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

        </div>
      </div>

      {/* ================= Buttons ================= */}
    {/* buttons */}
<div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">

  <button
    type="button"
    className="btn-secondary"
    onClick={onCancel}
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading}
    className="btn-primary flex items-center justify-center gap-2"
  >
    {loading && <Loader2 className="animate-spin h-4 w-4" />}
    {isEditMode ? "Update Employee" : "Add Employee"}
  </button>

</div>

    </form>
  );
};