import { Router } from "express"
import { clockInOut, getAttendance } from "../controllers/attendanceController.js"
import { protect } from "../middleware/protect.js"

const attendanceRouter = Router()

// Employee clock in / clock out
attendanceRouter.post("/clock", protect, clockInOut)

// Employee attendance history
attendanceRouter.get("/history", protect, getAttendance)

export default attendanceRouter