const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/moham/Desktop/React/image/client/public");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1700000 } });

module.exports = upload;
