const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validateUser } = require("../middleware/validateUser");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

router.get("/", auth, admin, async (req, res) => {
  const listOfUser = await Users.findAll();
  res.json(listOfUser);
});

router.get("/:id", [auth], async (req, res) => {
  const id = req.params.id;
  const User = await Users.findByPk(id);
  res.json(User);
});

router.post("/", [auth, admin, validateUser], async (req, res) => {
  try {
    const User = req.body;
    const user = await Users.findOne({ where: { email: User.email } });
    if (user) return res.status(400).json("user already registered");

    const hashedPassword = await bcrypt.hash(User.password, 10);

    // Create the admin user
    await Users.create({ ...User, password: hashedPassword });

    res.json(_.pick(User, ["name", "email"]));
  } catch (error) {
    // Handle other errors
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
