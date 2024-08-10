const Project = require("../models/projectData");

const createPost = async (req, res) => {
  try {
    const { title, description, url } = req.body;

    // Validate input
    if (!title || !description || !url) {
      throw new Error ( "All Feilds are required");
    }

    // Create a new project
    const newProject = new Project({
      title,
      description,
      url,
    });
    await newProject.save();
    return newProject;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error ( "Server Error");
  }
};

module.exports = { createPost };