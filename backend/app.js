const express = require("express");
const cors = require("cors");

// import route files
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");

// create express app (THIS MUST COME BEFORE app.use)
const app = express();

// global middlewares
const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],
};
app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

module.exports = app;
