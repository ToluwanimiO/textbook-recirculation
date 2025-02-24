const express = require("express");
const { register, login, getAllSchools } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/schools", getAllSchools);

module.exports = router;
