const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();
app.use(cors());

require("./startup/routes")(app);

require("dotenv").config();

const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("server running on port 3000");
  });
});
