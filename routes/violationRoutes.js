const express = require("express");
const { addViolation } = require("../controllers/violationController");

const router = express.Router();

router.post("/", addViolation);

module.exports = router;
