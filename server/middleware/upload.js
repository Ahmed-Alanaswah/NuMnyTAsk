const multer = require("multer");

function upload() {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${new Date().toISOString()}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });
  multer({ storage: fileStorage }).single("image");
}
module.exports = { upload };
