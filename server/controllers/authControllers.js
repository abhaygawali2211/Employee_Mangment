// import User from "../models/User.js"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

// // ---------------- LOGIN ----------------
// export const login = async (req, res) => {
//   try {
//     const { email, password, role_type } = req.body

//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required" })
//     }

//     const user = await User.findOne({ email: email.toLowerCase() })
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" })
//     }

//     if (role_type?.toUpperCase() !== user.role) {
//       return res.status(401).json({ error: "Not authorized for this role" })
//     }

//     const isvalid = await bcrypt.compare(password, user.password)
//     if (!isvalid) {
//       return res.status(401).json({ error: "Invalid credentials" })
//     }

//     const payload = {
//       userId: user._id.toString(),
//       role: user.role,
//       email: user.email
//     }

//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "7d"
//     })

//     return res.json({ user: payload, token })

//   } catch (error) {
//     console.error("Login error:", error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }

// // ---------------- SESSION ----------------
// export const session = (req, res) => {
//   const session = req.session
//   return res.json({ user: session })
// }

// // ---------------- CHANGE PASSWORD ----------------
// export const changePassword = async (req, res) => {
//   try {
//     const session = req.session
//     const { currentPassword, newPassword } = req.body

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ error: "Both passwords are required" })
//     }

//     const user = await User.findById(session.userId)
//     if (!user) {
//       return res.status(404).json({ error: "User not found" })
//     }

//     const isValid = await bcrypt.compare(currentPassword, user.password)
//     if (!isValid) {
//       return res.status(401).json({ error: "Current password is incorrect" })
//     }

//     const hashed = await bcrypt.hash(newPassword, 10)

//     await User.findByIdAndUpdate(session.userId, { password: hashed })

//     return res.json({ success: true })

//   } catch (error) {
//     console.error("Change password error:", error)
//     return res.status(500).json({ error: "Failed to change password" })
//   }
// }


import User from "../models/User.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password, role_type } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // role check
    if (role_type?.toUpperCase() !== user.role) {
      return res.status(401).json({
        error: "Not authorized for this role",
      });
    }

    // ✅ check employee deleted or not
    if (user.role === "EMPLOYEE") {

      const employee = await Employee.findOne({
        userId: user._id,
      });

      if (!employee || employee.isDeleted) {
        return res.status(403).json({
          error: "Employee account deleted",
        });
      }
    }

    // password check
    const isvalid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isvalid) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // token payload
    const payload = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    // create token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      user: payload,
      token,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ---------------- SESSION ----------------
export const session = (req, res) => {
  return res.json({
    user: req.session,
  });
};

// ---------------- CHANGE PASSWORD ----------------
export const changePassword = async (req, res) => {
  try {

    const session = req.session;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Both passwords are required",
      });
    }

    // logged in user
    const user = await User.findById(
      session.userId
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // current password check
    const isValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValid) {
      return res.status(401).json({
        error: "Current password is incorrect",
      });
    }

    // hash new password
    const hashed = await bcrypt.hash(
      newPassword,
      10
    );

    // update password
    await User.findByIdAndUpdate(
      session.userId,
      {
        password: hashed,
      }
    );

    return res.json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    console.error(
      "Change password error:",
      error
    );

    return res.status(500).json({
      error: "Failed to change password",
    });
  }
};