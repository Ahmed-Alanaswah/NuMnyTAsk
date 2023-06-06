const { authSchema } = require("../helpers/validationAuth");

const validateAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate the incoming data
    await authSchema.validateAsync({ email, password });

    // Data is valid, move to the next middleware or route handler
    next();
  } catch (error) {
    console.log("***********", "error");
    if (error.isJoi) {
      // Joi validation error
      return res.status(400).json({ error: error.details[0].message });
    }

    // Handle other errors
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { validateAuth };
