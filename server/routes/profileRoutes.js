import { Router } from "express"
import { getProfile, updateProfile } from "../controllers/profileController.js"
import { protect } from "../middleware/protect.js"

const profileRouter = Router()

// Get logged-in user profile (Admin + Employee)
profileRouter.get("/", protect, getProfile)

// Update logged-in employee profile
profileRouter.put("/", protect, updateProfile)

export default profileRouter