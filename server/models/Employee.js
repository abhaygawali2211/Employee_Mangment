import mongoose from "mongoose";
import { DEPARTMENTS } from "../constent/departments.js";

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },

    basicSalary: { type: Number, required: true, min: 0 },
    allowances: { type: Number, required: true, min: 0 },
    deduction: { type: Number, required: true, min: 0 },

    employeeStatus: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    joinDate: { type: Date, required: true },

    department: {
      type: String,
      enum: DEPARTMENTS,
      required: true,
    },

    bio: { type: String, default: "" },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;