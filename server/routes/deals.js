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

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const dealId = req.params.id;
  const updatedDealData = req.body;

  try {
    const deal = await Deals.findByPk(dealId);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    await deal.update(updatedDealData);
    res.json({ message: "Deal updated successfully" });
  } catch (error) {
    console.error("Error updating deal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
