const express = require("express");
const router = express.Router();
const projectService = require("../services/projectService");
const authenticateJWT = require("../middleware/auth"); // Import the JWT middleware

// Apply the middleware to the route
router.post("/create_post", authenticateJWT, async (req, res) => {
  try {
    const response = await projectService.createPost(req);

    if (response.status === 400) {
      return res.status(400).json({ message: response.message });
    }

    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
