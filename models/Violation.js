const mongoose = require("mongoose");

const ViolationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    book: String,
    school: String,
    donor: String,
    details: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Violation", ViolationSchema);
