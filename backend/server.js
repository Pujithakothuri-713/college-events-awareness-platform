// server.js

// 1️⃣ Load environment variables
require("dotenv").config();

// 2️⃣ Import app and database connection
const app = require("./app");
const connectDB = require("./config/db");

// 3️⃣ Connect to database
connectDB();

// 4️⃣ Set port
const PORT = process.env.PORT || 5000;

// 5️⃣ Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
