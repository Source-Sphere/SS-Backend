// services/userService.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Ensure this is called to load environment variables

const createUser = async (req) => {
  const { email, phone, username, realName, password } = req.body;

  // Validate input
  if (!email || !phone || !username || !realName || !password) {
    return { status: 400, message: "All fields are required" };
  }

  // Check if the username, email, or phone already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }, { username }],
  });

  if (existingUser) {
    return { status: 400, message: "Username, email, or phone already in use" };
  }

  // Create a new user
  const newUser = new User({
    email,
    phone,
    username,
    realName,
    password, // Save the password
  });

  await newUser.save();

  // Generate JWT token
  const token = jwt.sign(
    { userId: newUser._id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "10h" } // Token expires in 1 hour
  );

  return { status: 201, data: { user: newUser, token } };
};

module.exports = { createUser };
