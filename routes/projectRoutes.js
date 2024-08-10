const express = require("express");
const router = express.Router();
const projectService = require("../services/projectService");

router.post("/create_post", (req, res) => {
    try {
      const response = projectService.createPost();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;