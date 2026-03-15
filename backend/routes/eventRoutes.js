// GET /api/events → fetch events with filters
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");

// normalization helpers
const normalizeCity = (c) =>
  c
    .trim()
    .replace(/[-_]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();

const normalizeDomain = (d) =>
  d
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();


// GET /api/events/domains → unique normalized domains
router.get("/domains", async (req, res) => {
  try {
    const rawDomains = await Event.distinct("domains");
    const uniqueDomains = [...new Set(rawDomains.map(normalizeDomain))];

    res.status(200).json(uniqueDomains);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching domains",
      error: error.message,
    });
  }
});


// GET /api/events → fetch events with filters
router.get("/", async (req, res) => {
  try {
    const { city, date, domain } = req.query;
    let query = {};

    if (city) {
      query.city = { $regex: city.trim(), $options: "i" };
    }

    if (domain) {
      query.domains = { $regex: domain.trim(), $options: "i" };
    }

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      query.date = { $gte: start, $lte: end };
    }

    const events = await Event.find(query);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message,
    });
  }
});

// POST /api/events → create event
router.post(
  "/",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("collegeName").notEmpty().withMessage("College name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("date").isISO8601().withMessage("Valid date is required"),
    body("domains").isArray({ min: 1 }).withMessage("Domains are required"),
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      // normalize before saving
      const data = {
        ...req.body,
        city: normalizeCity(req.body.city),
        domains: req.body.domains.map(normalizeDomain),
      };

      const event = new Event(data);

      await event.save();

      res.status(201).json({
        message: "Event saved successfully",
        data: event,
      });

    } catch (error) {
      res.status(400).json({
        message: "Error saving event",
        error: error.message,
      });
    }
  }
);


// DELETE /api/events/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting event",
      error: error.message,
    });
  }
});


// PUT /api/events/:id
router.put("/:id", authMiddleware, async (req, res) => {
  try {

    // normalize before updating
    const updatedData = {
      ...req.body,
      city: normalizeCity(req.body.city),
      domains: req.body.domains.map(normalizeDomain),
    };

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating event",
      error: error.message,
    });
  }
});


module.exports = router;