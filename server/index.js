const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();
require("./startup/routes")(app);
require("./startup/db")(app);
require("dotenv").config();

app.use(cors());
