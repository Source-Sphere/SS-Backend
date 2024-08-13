const Project = require("../models/projectData");

const createPost = async (req) => {
  const { title, description, url, tags, userId, shortDescription } = req.body;

  // Validate input
  if (!title || !description || !url) {
    return { status: 400, message: "All fields are required" };
  }

  // Create a new project
  const newProject = new Project({
    title,
    description,
    url,
    tags, // Include tags in the new project
    userId,
    shortDescription,
  });

  await newProject.save();
  return { status: 201, data: newProject };
};

const getAllProjects = async () => {
  try {
    const projects = await Project.find();
    return { status: 200, data: projects };
  } catch (error) {
    return { status: 500, message: "Server error", error: error.message };
  }
};

// Get a project by ID
const getProjectById = async (id) => {
  try {
    const project = await Project.findById(id);
    if (!project) {
      return { status: 404, message: "Project not found" };
    }
    return { status: 200, data: project };
  } catch (error) {
    return { status: 500, message: "Server error", error: error.message };
  }
};

const getProjectsByUserId = async (userId) => {
  try {
    const projects = await Project.find({ userId });
    if (projects.length === 0) {
      return { status: 404, message: "No projects found for this user" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    return { status: 500, message: "Server error", error: error.message };
  }
};

module.exports = {
  createPost,
  getAllProjects,
  getProjectById,
  getProjectsByUserId,
};
