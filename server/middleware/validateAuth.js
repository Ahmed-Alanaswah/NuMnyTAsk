const { authSchema } = require("../validations/validationAuth");

const validateAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await authSchema.validateAsync({ email, password });

    next();
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({ error: error.details[0].message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { validateAuth };
