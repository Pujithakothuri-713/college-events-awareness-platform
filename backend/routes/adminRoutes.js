const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

/**
 * ADMIN REGISTER (one-time)
 * POST /api/admin/register
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, adminKey } = req.body;

    // optional admin key security check if configured in env
    if (process.env.ADMIN_REGISTRATION_KEY) {
      const headerKey = req.headers["x-admin-key"];
      if (
        adminKey !== process.env.ADMIN_REGISTRATION_KEY &&
        headerKey !== process.env.ADMIN_REGISTRATION_KEY
      ) {
        return res.status(403).json({ message: "Forbidden: Invalid admin registration key" });
      }
    }

    // check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create admin
    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering admin",
      error: error.message,
    });
  }
});

/**
 * ADMIN LOGIN
 * POST /api/admin/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
});

/**
 * PASSWORD RESET REQUEST
 * POST /api/admin/forgot-password
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const admin = await Admin.findOne({ email });

    if (admin) {
      // Recovery email would normally be sent here.
    }

    res.status(200).json({
      message: "If that email is registered, recovery instructions will be sent shortly.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error processing password recovery request",
      error: error.message,
    });
  }
});

module.exports = router;
