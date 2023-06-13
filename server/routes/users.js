const express = require("express");
const router = express.Router();
const multer = require("multer");
// const image = require('../images')
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validateUser } = require("../middleware/validateUser");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${new Date().toISOString()}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage: fileStorage }).single("image");

router.get("/", [auth], async (req, res) => {
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
    await Users.create({
      ...User,

      password: hashedPassword,
    });
    res.json(User);
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
    res.json({ message: "User updated successfully" });
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
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
