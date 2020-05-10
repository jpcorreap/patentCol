const express = require("express");
const router = express.Router();
//const bd = require("../db/MongoUtils.js");


router.get("/", function (req, res) {
  res.render("home", { user: req.user });
});

// Data endpoints

module.exports = router;
