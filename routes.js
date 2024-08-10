const express = require("express");
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/usersRoute");
const projectRoutes = require("./routes/projectRoutes")

module.exports = (app) => {
  app.use("/test", testRoutes);
  app.use("/user", userRoutes);
  app.use("/project",projectRoutes);
};
