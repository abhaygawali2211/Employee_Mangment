import { Router } from "express"

import {
  clockInOut,
  getAttendance,
  getTodayAttendance,
} from "../controllers/attendanceController.js"

import { protect } from "../middleware/protect.js"

const attendanceRouter = Router()

// Employee clock in / clock out
attendanceRouter.post(
  "/clock",
  protect,
  clockInOut
)

// Employee attendance history
attendanceRouter.get(
  "/history",
  protect,
  getAttendance
)

// Today's attendance
attendanceRouter.get(
  "/today-attendance",
  protect,
  getTodayAttendance
)

export default attendanceRouter