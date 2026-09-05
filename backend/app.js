const express = require("express");
const cors = require("cors");

// import route files
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");

// create express app (THIS MUST COME BEFORE app.use)
const app = express();

// global middlewares
// CORS_ORIGIN: comma-separated list of allowed frontend origins.
// CLIENT_URL: single-origin alternative (also supported).
// Example (Render env var): CORS_ORIGIN=https://your-app.vercel.app
const rawOrigins = process.env.CORS_ORIGIN || process.env.CLIENT_URL || "http://localhost:3000";
const allowedOrigins = rawOrigins.split(",").map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],
    credentials: true,
  })
);
app.use(express.json());

// routes
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

module.exports = app;
