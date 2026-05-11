import { Router } from "express"
import {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  createEmployee
} from "../controllers/employeeController.js"

import { protect, protectAdmin } from "../middleware/protect.js"

const employeeRouter = Router()

// All routes protected
employeeRouter.get("/", protect, getEmployees)

employeeRouter.post("/", protect, protectAdmin, createEmployee)

employeeRouter.put("/:id", protect, protectAdmin, updateEmployee)

employeeRouter.delete("/:id", protect, protectAdmin, deleteEmployee)

export default employeeRouter