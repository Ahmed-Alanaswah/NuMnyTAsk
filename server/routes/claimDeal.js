const express = require("express");
const router = express.Router();
const { ClaimedDeal } = require("../models"); // Import the claimedDeal model
const { Deals } = require("../models");

router.get("/", async (req, res) => {
  const listOfClaimedDeals = await ClaimedDeal.findAll({
    include: [
      {
        model: Deals,
        attributes: ["amount", "currency", "status"], // Include the amount and currency properties from the deal model
      },
    ],
  });
  res.json(listOfClaimedDeals);
});

// Route to claim a deal
router.post("/", async (req, res) => {
  try {
    const claimedDeal = req.body;
    // Create a claimedDeal instance
    await ClaimedDeal.create(claimedDeal);
    return res.status(200).json({ message: "Deal claimed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
