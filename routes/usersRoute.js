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

module.exports = router;
