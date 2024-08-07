const express = require("express");
const router = express.Router();
const testService = require("../services/testService");

// Define the test route
router.get("/example", (req, res) => {
  try {
    const response = testService.testFunction();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
