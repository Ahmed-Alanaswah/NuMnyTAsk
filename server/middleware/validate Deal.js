const { dealSchema } = require("../validations/validationDeals");

const validateDeal = async (req, res, next) => {
  try {
    const deal = req.body;

    await dealSchema.validateAsync(deal);

    next();
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({ error: error.details[0].message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { validateDeal };
