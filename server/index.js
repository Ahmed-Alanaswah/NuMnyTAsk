const express = require("express");
const multer = require("multer");
require("express-async-errors");
const cors = require("cors");
const app = express();
app.use(cors());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${new Date().toISOString()}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

app.use(multer({ storage: fileStorage }).single("image"));
app.use(express.static("images"));

require("./startup/routes")(app);

require("dotenv").config();

const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("server running on port 3000");
  });
});
