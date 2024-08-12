const Project = require("../models/projectData");

const createPost = async (req) => {
  const { title, description, url, userId } = req.body;

  // Validate input
  if (!title || !description || !url) {
    return { status: 400, message: "All fields are required" };
  }

  // Create a new project
  const newProject = new Project({
    title,
    description,
    url,
    userId,
  });

  await newProject.save();
  return { status: 201, data: newProject };
};

module.exports = { createPost };
