const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    subject: { type: String, required: false },
    gradeLevel: { type: String, required: false },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
