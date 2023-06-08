const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  status: Joi.string().required(),
  gender: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  lastLoginDateTime: Joi.string(),
  isAdmin: Joi.bool(),
});

module.exports = { userSchema };
