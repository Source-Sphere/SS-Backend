const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Use the routes handling function
routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
