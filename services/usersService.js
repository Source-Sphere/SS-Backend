// services/userService.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Ensure this is called to load environment variables

const createUser = async (req) => {
  const { email, phone, password, gitHubUrl } = req.body;

  // Validate input
  if (!email || !username || !password || !gitHubUrl) {
    return { status: 400, message: "All fields are required" };
  }

  // Check if the username, email, or phone already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { gitHubUrl }, { username }],
  });

  if (existingUser) {
    return { status: 400, message: "Username, email, or phone already in use" };
  }

  // Create a new user
  const newUser = new User({
    email,
    phone,
    password,
    gitHubUrl, // Save the password
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

const loginUser = async (req) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return { status: 400, message: "Username and password are required" };
  }

  // Find the user by username
  const user = await User.findOne({ username });

  // Check if user exists and if password matches
  if (!user || !(await user.comparePassword(password))) {
    return { status: 401, message: "Invalid username or password" };
  }

  // Generate JWT token and refresh token
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Access token expiration
  );

  const refreshToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // Refresh token expiration
  );

  // Return the user details, access token, and refresh token
  return { status: 200, data: { user, token, refreshToken } };
};

const refreshAccessToken = async (req) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return { status: 400, message: "Refresh token is required" };
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // New access token expiration
    );
    return { status: 200, data: { token: newToken } };
  } catch (error) {
    return { status: 403, message: "Invalid or expired refresh token" };
  }
};

module.exports = {
  createUser,
  loginUser,
  refreshAccessToken,
};
