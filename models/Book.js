const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    subject: { type: String, required: false },
    gradeLevel: { type: String, required: false },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "claimed"],
      default: "available",
    },
    donatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isbn: { type: String, unique: false, sparse: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
