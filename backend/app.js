const express = require("express");
const cors = require("cors");

// import route files
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");

// create express app (THIS MUST COME BEFORE app.use)
const app = express();

// global middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

module.exports = app;
