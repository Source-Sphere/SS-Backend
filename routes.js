const express = require("express");
const testRoutes = require("./routes/testRoutes");

module.exports = (app) => {
  app.use("/test", testRoutes);
};
