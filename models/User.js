const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }, // Added phone number for all users
    role: {
      type: String,
      enum: ["student", "donor", "school"],
      required: true,
    },
    location: {
      type: String,
      required: function () {
        return this.role === "school";
      },
    }, // Only for schools
    availableBooks: {
      type: Number,
      required: function () {
        return this.role === "school";
      },
    }, // Only for schools
    anonymous: {
      type: Boolean,
      default: false,
      required: function () {
        return this.role === "donor";
      },
    }, // Only for donors
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
