import { Router } from "express"
import {
  getMonthlyAttendanceReport,
} from "../controllers/adminAttendanceController.js"

import { protect, protectAdmin } from "../middleware/protect.js"

const router = Router()

router.get(
  "/monthly-report",
  protect,
  protectAdmin,
  getMonthlyAttendanceReport
)

export default router