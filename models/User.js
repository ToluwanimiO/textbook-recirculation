const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "donor", "school"],
      required: true,
    },
    location: {
      country: {
        type: String,
        required: function () {
          return this.role === "school";
        },
      },
      state: {
        type: String,
        required: function () {
          return this.role === "school";
        },
      },
      address: {
        type: String,
        required: function () {
          return this.role === "school";
        },
      },
    },
    libraryLimit: {
      type: Number,
      required: function () {
        return this.role === "school";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
