import React, { useState } from "react";
import { DEPARTMENTS } from "../assets/assets";
import toast from "react-hot-toast";
import api from "../api/axios";
import { Loader2 } from "lucide-react";

export const Employeefrom = ({ inisialData, onSuccess, onCancel }) => {
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});
  const isEditMode = !!inisialData;

  const validate = (formData) => {
    let err = {};

    const check = (name, label) => {
      if (!formData.get(name)) err[name] = `${label} is required`;
    };

    check("firstName", "First Name");
    check("lastName", "Last Name");
    check("email", "Email");
    check("phone", "Phone");
    check("joinDate", "Join Date");
    check("department", "Department");
    check("basicSalary", "Basic Salary");
    check("allowances", "Allowances");

    if (!isEditMode && !formData.get("password")) {
      err.password = "Password is required";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setloading(false);
      return;
    }

    setErrors({});

    formData.set("deduction", formData.get("deductions") || 0);

    if (isEditMode) {
      const pwd = formData.get("password");
      if (!pwd) formData.delete("password");
    }

    try {
      const url = isEditMode
        ? `/employees/${inisialData.id}`
        : "/employees";

      const method = isEditMode ? "put" : "post";

      await api[method](url, formData);

      toast.success(
        isEditMode ? "Employee updated" : "Employee created"
      );

      onSuccess && onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setloading(false);
    }
  };

  const errText = (name) => (
    <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-8 max-h-[80vh] overflow-y-auto"
    >

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label>First Name</label>
            <input name="firstName" defaultValue={inisialData?.firstName} className="border rounded-lg px-3 py-2 w-full" />
            {errText("firstName")}
          </div>

          <div>
            <label>Last Name</label>
            <input name="lastName" defaultValue={inisialData?.lastName} className="border rounded-lg px-3 py-2 w-full" />
            {errText("lastName")}
          </div>

          <div>
            <label>Phone</label>
            <input name="phone" defaultValue={inisialData?.phone} className="border rounded-lg px-3 py-2 w-full" />
            {errText("phone")}
          </div>

          <div>
            <label>Join Date</label>
            <input
              type="date"
              name="joinDate"
              defaultValue={
                inisialData?.joinDate
                  ? new Date(inisialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
              className="border rounded-lg px-3 py-2 w-full"
            />
            {errText("joinDate")}
          </div>

          <div className="md:col-span-2">
            <label>Bio</label>
            <textarea name="bio" defaultValue={inisialData?.bio} className="border rounded-lg px-3 py-2 w-full" />
          </div>

        </div>
      </div>

      {/* Employment Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Employment Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label>Department</label>
            <select name="department" defaultValue={inisialData?.department || ""} className="border rounded-lg px-3 py-2 w-full">
              <option value="">Select Department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errText("department")}
          </div>

          <div>
            <label>Position</label>
            <input name="position" defaultValue={inisialData?.position} className="border rounded-lg px-3 py-2 w-full" />
          </div>

          <div>
            <label>Basic Salary</label>
            <input type="number" name="basicSalary" defaultValue={inisialData?.basicSalary} className="border rounded-lg px-3 py-2 w-full" />
            {errText("basicSalary")}
          </div>

          <div>
            <label>Allowances</label>
            <input type="number" name="allowances" defaultValue={inisialData?.allowances} className="border rounded-lg px-3 py-2 w-full" />
            {errText("allowances")}
          </div>

          <div>
            <label>Deductions</label>
            <input type="number" name="deductions" defaultValue={inisialData?.deductions} className="border rounded-lg px-3 py-2 w-full" />
          </div>

          {isEditMode && (
            <div>
              <label>Status</label>
              <select name="employeeStatus" defaultValue={inisialData?.employeeStatus || "ACTIVE"} className="border rounded-lg px-3 py-2 w-full">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          )}

        </div>
      </div>

      {/* Account Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Account Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label>Email</label>
            <input type="email" name="email" defaultValue={inisialData?.email} className="border rounded-lg px-3 py-2 w-full" />
            {errText("email")}
          </div>

          <div>
            <label>{isEditMode ? "Change Password" : "Temporary Password"}</label>
            <input type="password" name="password" className="border rounded-lg px-3 py-2 w-full" />
            {errText("password")}
          </div>

          <div>
            <label>Role</label>
            <select name="role" defaultValue={inisialData?.user?.role || "EMPLOYEE"} className="border rounded-lg px-3 py-2 w-full">
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2">
          {loading && <Loader2 className="animate-spin h-4 w-4" />}
          {isEditMode ? "Update Employee" : "Add Employee"}
        </button>
      </div>
    </form>
  );
};