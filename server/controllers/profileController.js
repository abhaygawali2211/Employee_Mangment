import Employee from "../models/Employee.js"

// GET PROFILE (Admin + Employee dono)
export const getProfile = async (req, res) => {
  try {
    const session = req.session

    const employee = await Employee.findOne({ userId: session.userId })

    // Agar Admin hai (Employee record nahi milega)
    if (!employee) {
      return res.json({
        firstName: "Admin",
        lastName: "",
        email: session.email,
        role: session.role
      })
    }

    return res.json(employee)
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch profile" })
  }
}


// UPDATE PROFILE (sirf Employee)
export const updateProfile = async (req, res) => {
  try {
    const session = req.session

    const employee = await Employee.findOne({ userId: session.userId })

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" })
    }

    if (employee.isDeleted) {
      return res.status(403).json({
        error: "Your account is deactivated. You cannot update your profile."
      })
    }

    employee.bio = req.body.bio || employee.bio

    await employee.save()

    return res.json({ success: true })
  } catch (error) {
    return res.status(500).json({ error: "Failed to update profile" })
  }
}