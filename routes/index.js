const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils.js");

router.get("/", function (req, res) {
  res.render("home", { user: req.user });
});

// Data endpoints
router.get("/solicitudes",  (req, res) => {
  console.log("12");
  db.getSolicitudes().then((docs) => {
    res.json({succes: true ,docs});
  });
});

router.get("/getPatentscope", function (req, res) {
  db.patents.getPatentScope().then((col) => {
    res.json(col);
  });
});

router.get("/getGoogleUtilityPatents", function (req, res) {
  db.patents.getGoogleUtilityPatents().then((col) => {
    res.json(col);
  });
});

router.get("/getGoogleUtilityPatents", function (req, res) {
  db.patents.getGoogleUtilityPatents().then((col) => {
    res.json(col);
  });
});

module.exports = router;
