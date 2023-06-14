const express = require("express");
const router = express.Router();
const { ClaimedDeal } = require("../models");
const { Deals } = require("../models");

router.get("/", async (req, res) => {
  const listOfClaimedDeals = await ClaimedDeal.findAll({
    include: [
      {
        model: Deals,
        attributes: ["amount", "currency", "status"],
      },
    ],
  });
  res.json(listOfClaimedDeals);
});

router.post("/", async (req, res) => {
  try {
    const claimedDeal = req.body;
    await ClaimedDeal.create(claimedDeal);
    return res.status(200).json({ message: "Deal claimed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
