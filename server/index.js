const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const db = require("./models");

//routers
const userRouter = require("./routes/Users");
app.use("/Users", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("server running on port 3000");
  });
});
