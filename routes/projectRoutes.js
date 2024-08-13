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

router.get("/get_projects", async (req, res) => {
  const result = await projectService.getAllProjects();
  res.status(result.status).json(result.data || { message: result.message });
});

// GET a single project by ID
router.get("/get_projects_by_id", authenticateJWT, async (req, res) => {
  const { id } = req.body;
  const result = await projectService.getProjectById(id);
  res.status(result.status).json(result.data || { message: result.message });
});

router.get("/get_projects_by_user_id", authenticateJWT, async (req, res) => {
  const { userId } = req.params;
  const result = await projectService.getProjectsByUserId(userId);
  res.status(result.status).json(result.data || { message: result.message });
});

module.exports = router;
