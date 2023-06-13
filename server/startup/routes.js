const express = require("express");
const userRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const dealsRouter = require("../routes/deals");
const claimDealsRouter = require("../routes/claimDeal");
const { error } = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/deals", dealsRouter);
  app.use("/api/claim-deals", claimDealsRouter);

  app.use(error);
};
