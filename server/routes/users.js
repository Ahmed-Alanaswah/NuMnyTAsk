const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validateUser } = require("../middleware/validateUser");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

router.get("/", [auth], async (req, res) => {
  const listOfUser = await Users.findAll();
  res.json(listOfUser);
});

router.get("/:id", [auth], async (req, res) => {
  const id = req.params.id;
  const User = await Users.findByPk(id);

  if (!User) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(User);
});

router.post("/", [auth, admin, validateUser], async (req, res) => {
  try {
    const userData = req.body;
    const existingUser = await Users.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      return res.status(400).json("User already registered");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser = await Users.create({
      ...userData,
      password: hashedPassword,
    });
    res.json(_.pick(createdUser, ["id", "name", "email"]));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const { file } = req;
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    updatedUserData.image = (file && file.path) || null;
    await user.update(updatedUserData);
    res.json(updatedUserData);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update(updatedUserData);
    res.json(updatedUserData);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const idsList = req.body.idsList;
    await Users.destroy({ where: { id: idsList } });
    res.status(200).json({ message: "User(s) deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
