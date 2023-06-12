const Joi = require("joi");

const dealSchema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(5).max(20).required(),
  status: Joi.string().required(),
  amount: Joi.string().required(),
  currency: Joi.string().required(),
});

module.exports = { dealSchema };
