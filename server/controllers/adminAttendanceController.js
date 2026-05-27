import Attendance from "../models/Attendance.js"

export const getMonthlyAttendanceReport = async (req, res) => {
  try {
    const { month, year, employeeId } = req.query

    const startDate = new Date(year, month - 1, 1)

    const endDate = new Date(year, month, 0)

    const query = {
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }

    // Employee filter
    if (employeeId) {
      query.employeeId = employeeId
    }

    const data = await Attendance.find(query)
      .populate("employeeId")
      .sort({ date: -1 })

    return res.json({
      success: true,
      data,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: "Failed to fetch report",
    })
  }
}