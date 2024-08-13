const mongoose = require("mongoose");

// Define the schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String], // Array of strings to store tags
    trim: true,
  },
});

// Create the model
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
