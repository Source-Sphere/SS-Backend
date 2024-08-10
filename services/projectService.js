const Project = require("../models/projectData");

const createPost = async (req) => {
  const { title, description, url } = req.body;

  // Validate input
  if (!title || !description || !url) {
    return { status: 400, message: "All fields are required" };
  }

  // Create a new project
  const newProject = new Project({
    title,
    description,
    url,
  });

  await newProject.save();
  return { status: 201, data: newProject };
};

module.exports = { createPost };
