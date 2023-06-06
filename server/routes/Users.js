const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const listOfUser = await Users.findAll();
  res.json(listOfUser);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const User = await Users.findByPk(id);
  res.json(User);
});

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   const User = await Users.destroy({ where: { id: id } });
//   res.json(User);
// });

router.post("/", async (req, res) => {
  const User = req.body;
  const hashedPassword = await bcrypt.hash(User.password, 10);

  // Create the admin user
  await Users.create({ ...User, password: hashedPassword });

  res.json("success");
});

// app.delete("/users", verifyToken, async (req, res) => {
//   try {
//     const { emailList } = req.body;

//     // Check if the admin user exists
//     const admin = await Admin.findOne({ where: { email: req.user.email } });
//     if (!admin) {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     // Delete the user(s)
//     await Users.destroy({ where: { email: emailList } });

//     res.status(200).json({ message: "User(s) deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    return res.json({ error: "user not found" });
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ error: "Invalid email or password" });
  }

  res.json("You logged in ");
});

module.exports = router;
