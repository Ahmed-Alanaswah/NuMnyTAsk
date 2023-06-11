const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateAuth } = require("../middleware/validateAuth");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

router.post("/", validateAuth, async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) return res.json({ error: "invalid email or password" });

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ error: "Invalid email or password" });
  }
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(
    _.pick(user, [
      "id",
      "name",
      "email",
      "phone",
      "status",
      "gender",
      "dateOfBirth",
      "lastLoginDateTime",
      "isAdmin",
      "image",
    ]),
    secretKey
  );

  res.header("x-auth-token", token).json(token);
});
module.exports = router;
