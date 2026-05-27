import Employee from "../models/Employee.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";


// ================= GET EMPLOYEES =================
export const getEmployees = async (req, res) => {
  try {
    const { department } = req.query;

    const where = { isDeleted: false };
    if (department) where.department = department;

    const employees = await Employee.find(where)
      .sort({ createdAt: -1 })
      .populate("userId", "email role")
      .lean();

    const result = employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      user: emp.userId
        ? { email: emp.userId.email, role: emp.userId.role }
        : null,
    }));

    return res.json(result);
  } catch (error) {
    console.error("get employee error:", error);
    return res.status(500).json({ error: "failed to fetch employee" });
  }
};



// ================= CREATE EMPLOYEE =================
export const createEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      basicSalary,
      allowances,
      deduction,
      joinDate,
      department,
      password,
      bio,
    } = req.body;

    // ✅ STRONG VALIDATION (no crash)
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !joinDate ||
      !department
    ) {
      await session.abortTransaction();
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
      [{ email, password: hashedPassword, role: "EMPLOYEE" }],
      { session }
    );

    const employee = await Employee.create(
      [
        {
          userId: user[0]._id,
          firstName,
          lastName,
          email,
          phone,
          basicSalary: Number(basicSalary) || 0,
          allowances: Number(allowances) || 0,
          deduction: Number(deduction) || 0,
          joinDate: new Date(joinDate),
          department,
          bio: bio || "",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Employee created successfully",
      id: employee[0]._id,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("create employee error:", error);
    return res.status(500).json({ error: "Failed to create employee" });
  }
};



// ================= UPDATE EMPLOYEE =================
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      basicSalary,
      allowances,
      deduction,
      joinDate,
      department,
      bio,
      employeeStatus,
      role,
      password,
    } = req.body;

    await Employee.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deduction: Number(deduction) || 0,
      joinDate: joinDate ? new Date(joinDate) : employee.joinDate,
      department,
      bio: bio || "",
      employeeStatus: employeeStatus || employee.employeeStatus,
    });

    const userUpdate = {};
    if (email) userUpdate.email = email;
    if (role) userUpdate.role = role;
    if (password) userUpdate.password = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(employee.userId, userUpdate);

    return res.json({ message: "Employee updated successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error("update employee error:", error);
    return res.status(500).json({ error: "Failed to update employee" });
  }
};



// ================= DELETE (SOFT) =================
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    if (employee.isDeleted) {
      return res.status(400).json({ error: "Employee already deleted" });
    }

    employee.isDeleted = true;
    employee.employeeStatus = "INACTIVE";
    await employee.save();

    return res.json({ success: true, message: "Employee deleted (soft)" });
  } catch (error) {
    console.error("delete employee error:", error);
    return res.status(500).json({ error: "Failed to delete employee" });
  }
};