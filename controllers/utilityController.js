const axios = require("axios");

const API_KEY = process.env.CSC_API_KEY;
const BASE_URL = "https://api.countrystatecity.in/v1";

// Set headers for API requests
const headers = {
  "X-CSCAPI-KEY": API_KEY,
};

exports.getCountries = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/countries`, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch countries" });
  }
};

exports.getStates = async (req, res) => {
  const { countryCode } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/countries/${countryCode}/states`, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch states",error });
  }
};