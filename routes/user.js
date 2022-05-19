const express = require("express");
const router = express.Router();
const dbConnect = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// kullanıcı getir id

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const values = [username, password];
  dbConnect.query(
    " SELECT * FROM users WHERE username = ? AND password = ? ",
    values,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          const token = jwt.sign({ username }, process.env.JWT_SECRET , { expiresIn: "8h" });
          res.status(200).send({
            token,
            user: result[0],
          });
        } else {
          res.status(500).send("giriş başarısız");
        }
      }
    }
  );
});

router.post("/authen", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.send({ status: "ok", decoded })
  } catch {
    res.json({ status: "error", decoded: null })
  }
})

module.exports = router;
