const express = require("express");
const userRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const { error } = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use(error);
};
