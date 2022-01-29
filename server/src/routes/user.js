const express = require("express");
const router = new express.Router();
const db = require("../db/db");
const upload = require("../middleware/multer");

router.use("/image", express.static("src/upload/images"));

router.post("/register", upload.single("image"), (req, res) => {
  const { name, email } = req.body;
  const image = `http://localhost:4000/image/${req.file.filename}`;

  const sql = "INSERT INTO user SET ?;";

  db.query(sql, { name, email, image }, (error, results) => {
    if (error) throw error;
    console.log("The results is: ", results);
    res.send(results);
  });
});

router.post("/login", (req, res) => {
  const { name, email } = req.body;

  const userData = [name, email];

  const sql = "SELECT id from user WHERE name = ? AND email = ?";

  db.query(sql, userData, (error, results) => {
    if (error) throw error;
    console.log("The results is: ", results);
    res.send(results);
  });
});

router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    success: 1,
    file_url: `http://localhost:4000/file/${req.file.filename}`,
  });
});

module.exports = router;
