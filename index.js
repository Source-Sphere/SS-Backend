const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const connectDB = require("./Db/db");
const router = express.router;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/.netlify/funtion/routes", router);
connectDB();

routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports.handler = serverless(app);
