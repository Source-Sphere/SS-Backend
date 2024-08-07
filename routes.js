const express = require("express");
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/usersRoute");

module.exports = (app) => {
  app.use("/test", testRoutes);
  app.use("/user", userRoutes);
};
