const Org = require("../models/org.js");

const registerOrg = async (req) => {
  const { orgName, orgURL, desc, techStack, userId } = req.body;

  if (!userId) {
    return { status: 409, message: "User Not Found" };
  }

  if (!orgName?.trim() || !orgURL?.trim() || !desc?.trim()) {
    return {
      status: 400,
      message: "Organization name, URL and description are required",
    };
  }

  if (!Array.isArray(techStack) || techStack.length === 0) {
    return { status: 400, message: "At least one tech stack item is required" };
  }

  // Check if the organization already exists by either orgName or orgURL
  const existedOrg = await Org.findOne({
    $or: [{ orgName }, { orgURL }],
  });

  if (existedOrg) {
    return { status: 409, message: "Organization already exists" };
  }

  // Create a new organization document
  const orgCreation = await Org.create({
    orgName,
    orgURL,
    desc,
    techStack,
    userId,
  });

  // Find the created organization document by ID
  const createdOrg = await Org.findById(orgCreation._id);

  if (!createdOrg) {
    return {
      status: 500,
      message: "Oops, something went wrong while creating the organization",
    };
  }

  return {
    status: 201,
    data: createdOrg,
    message: "Organization created successfully",
  };
};

const getAllOrg = async () => {
  const allOrgs = await Org.find();

  if (allOrgs.length === 0) {
    return { status: 200, data: [], message: "No organizations exist" };
  }

  return {
    status: 200,
    data: allOrgs,
    message: "All orgs fetched successfully",
  };
};

const getOrgByID = async (id) => {
  try {
    const project = await Org.findById(id);
    if (!project) {
      return { status: 404, message: "Project not found" };
    }
    return { status: 200, data: project };
  } catch (error) {
    return { status: 500, message: "Server error", error: error.message };
  }
};

const getOrgByUserId = async (userId) => {
  try {
    const projects = await Org.find({ userId });
    if (projects.length === 0) {
      return { status: 404, message: "No projects found for this user" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    return { status: 500, message: "Server error", error: error.message };
  }
};

module.exports = {
  getAllOrg,
  registerOrg,
  getOrgByID,
  getOrgByUserId,
};
