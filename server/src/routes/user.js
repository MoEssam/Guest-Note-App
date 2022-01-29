const express = require("express");
const router = new express.Router();
const db = require("../db/db");
const upload = require("../middleware/multer");

router.post("/register", (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO user SET ?;";

  db.query(sql, { name, email }, (error, results) => {
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

// router.post("/image", upload.single("image"), (req, res) => {
//   if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//     res.send({ msg: "Only image files (jpg, jpeg, png) are allowed!" });
//   } else {
//     const image = req.file.filename;
//     console.log(image);
//     // const id = 1;
//     const sql = "INSERT INTO image SET ?";
//     db.query(sql, { image }, (error, result) => {
//       if (error) {
//         console.log(error);
//         res.send({ msg: err });
//       }
//       if (result) {
//         console.log("The solution is: ", result);
//         res.send({ message: "image uploaded", data: result });
//       }
//     });
//   }
// });

// router.get("/image", (req, res) => {
//   const sql = "SELECT * FROM image WHERE id = 6";
//   db.query(sql, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.send({ msg: error });
//     }
//     if (result) {
//       console.log("The solution is moe: ", result);
//       console.log(result);
//       res.send({ image: result[0].image });
//     }
//   });
// });

module.exports = router;
