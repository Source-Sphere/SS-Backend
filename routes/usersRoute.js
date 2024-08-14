// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userService = require("../services/usersService");

router.post("/create_user", async (req, res) => {
  try {
    const response = await userService.createUser(req);

    if (response.status === 400) {
      return res.status(400).json({ message: response.message });
    }

    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await userService.loginUser(req);

    if (response.status === 401) {
      return res.status(401).json({ message: response.message });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/refresh_token", async (req, res) => {
  try {
    const response = await userService.refreshAccessToken(req);

    if (response.status === 403) {
      return res.status(403).json({ message: response.message });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
