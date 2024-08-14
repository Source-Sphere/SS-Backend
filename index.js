const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const routes = require("./routes");
const connectDB = require("./Db/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

const corsOptions = {
  origin: "*",
  // allowedHeaders: [
  //   "Content-Type",
  //   "Authorization",
  //   "X-Requested-With",
  //   "Accept",
  // ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use("*", cors(corsOptions));

app.use(express.json());
connectDB();

routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
