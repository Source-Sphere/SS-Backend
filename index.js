const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const routes = require("./routes");
const connectDB = require("./Db/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If you need to support cookies or credentials
  })
);

app.use(express.json());
connectDB();

routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
