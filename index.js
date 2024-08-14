const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const routes = require("./routes");
const connectDB = require("./Db/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
connectDB();

routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
