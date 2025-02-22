require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

// Connect to MongoDB
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI is missing or undefined!");
  process.exit(1);
}
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err, process.env.MONGO_URI));

app.get("/", (req, res) => {
  res.send("Textbook Recirculation API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
