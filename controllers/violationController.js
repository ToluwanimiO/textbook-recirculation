const Violation = require("../models/Violation"); // Ensure correct path

exports.addViolation = async (req, res) => {
  try {
    const { type, book, school, donor, details } = req.body;
    if (!type || !details) {
      return res
        .status(400)
        .json({ message: "Violation Type and Details are required." });
    }

    const newViolation = new Violation({ type, book, school, donor, details });

    await newViolation.save();

    res.status(201).json({ message: "Report submitted successfully!" });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
