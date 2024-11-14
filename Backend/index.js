const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./controllers/db.js");
const studentRoutes = require("./routes/studentRoutes.js");
const facultyRoutes = require("./routes/facultyRoutes.js");

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Connect to MongoDB
connectDB();

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
