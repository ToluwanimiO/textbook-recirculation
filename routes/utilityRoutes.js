const express = require("express");
const { getCountries, getStates } = require("../controllers/utilityController");

const router = express.Router();
router.get("/countries", getCountries);
router.get("states/:countryCode", getStates);

module.exports = router;
