const express = require("express");
const router = new express.Router();
const db = require("../db/db");
const upload = require("../middleware/multer");

router.use("/file", express.static("src/upload/images"));
router.post("/add-note", upload.single("file"), (req, res) => {
  const { user_id, title, message, note_type } = req.body;
  const media = `http://localhost:4000/file/${req.file.filename}`;

  var date = new Date();
  date =
    date.getUTCFullYear() +
    "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getUTCDate()).slice(-2) +
    " " +
    ("00" + date.getUTCHours()).slice(-2) +
    ":" +
    ("00" + date.getUTCMinutes()).slice(-2) +
    ":" +
    ("00" + date.getUTCSeconds()).slice(-2);

  const sql = "INSERT INTO note SET ?;";

  db.query(
    sql,
    { user_id, title, message, note_type, media, date },
    (error, results, fields) => {
      if (error) throw error;
      console.log("The results is: ", results);
      res.send({ message: "row inserted" });
    }
  );
});

router.post("/send-note", (req, res) => {
  const { sent_id, receive_email, note_id } = req.body;

  const sql = "INSERT INTO send_note SET ?;";

  db.query(sql, { sent_id, receive_email, note_id }, (error, results) => {
    if (error) throw error;
    console.log("The results is: ", results);
    res.send({ message: "row inserted" });
  });
});

router.get("/notes/:userid", (req, res) => {
  const user_id = req.params.userid;
  const sql = "SELECT * FROM note WHERE user_id = ? AND seen = 0";
  db.query(sql, [user_id], (error, result) => {
    if (error) {
      console.log(error);
      res.send({ msg: error });
    }
    if (result) {
      console.log("The solution is moe: ", result);
      res.send(result);
    }
  });
});

router.get("/notetypes", (req, res) => {
  const sql = "SELECT id,type FROM notetype";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.send({ msg: error });
    }
    if (result) {
      console.log("The solution is moe: ", result);
      res.send(result);
    }
  });
});

router.post("/readnote/:userid/:noteid", (req, res) => {
  const user_id = req.params.userid;
  const note_id = req.params.noteid;

  const sql = "UPDATE note set seen = 1 where user_id = ? and id = ? ;";

  db.query(sql, [user_id, note_id], (error, result) => {
    if (error) {
      console.log(error);
      res.send({ msg: error });
    }
    if (result) {
      console.log("The solution is moe: ", result);
      res.send(result);
    }
  });
});

router.post("/notes/softdelete/:userid/:noteid", (req, res) => {
  const user_id = req.params.userid;
  const note_id = req.params.noteid;

  var sql = "UPDATE note set softdelete = 1 where user_id = ? and id = ? ;";

  db.query(sql, [user_id, note_id], (error, result) => {
    if (error) {
      console.log(error);
      res.send({ msg: error });
    }
    if (result) {
      console.log("The solution is moe: ", result);
      res.send(result);
    }
  });
});

module.exports = router;
