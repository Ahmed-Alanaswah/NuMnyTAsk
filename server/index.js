// const express = require("express");
const express = require("express");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const dealsRouter = require("./routes/deals");
const claimDealsRouter = require("./routes/claimDeal");
const { error } = require("./middleware/error");

const multer = require("multer");
const path = require("path");
require("express-async-errors");
const cors = require("cors");
const app = express();
app.use(cors());

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${new Date().toISOString()}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
// const upload = multer({ storage: fileStorage }).single("image");
app.use(multer({ storage: fileStorage }).single("image"));
// app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("images"));

// require("./startup/routes")(app);

require("dotenv").config();

const db = require("./models");

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/deals", dealsRouter);
app.use("/api/claim-deals", claimDealsRouter);
app.use(error);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("server running on port 3000");
  });
});
