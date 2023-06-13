const { userSchema } = require("../validations/validationUserSchema");

const validateUser = async (req, res, next) => {
  try {
    const user = req.body;

    await userSchema.validateAsync(user);

    next();
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({ error: error.details[0].message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { validateUser };
