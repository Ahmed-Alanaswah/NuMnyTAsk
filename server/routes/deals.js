const express = require("express");
const router = express.Router();
const { Deals } = require("../models");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const { validateDeal } = require("../middleware/validate Deal");

router.get("/", async (req, res) => {
  const listOfDeal = await Deals.findAll();
  res.json(listOfDeal);
});

router.get("/:id", [auth], async (req, res) => {
  const id = req.params.id;
  const Deal = await Deals.findByPk(id);
  res.json(Deal);
});

router.post("/", [auth, admin, validateDeal], async (req, res) => {
  try {
    const Deal = req.body;
    await Deals.create(Deal);
    res.json(Deal);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
