const express = require("express");
const router = express.Router();
const userService = require("../services/usersService");

router.get("/get_user", async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
