var express = require('express');
var router = express.Router();
const bd = require("../db/MongoUtils.js");
const bu = require("../db/BcryptUtils.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { user: req.user });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  try {
    bd.users.findByUsername(req.body.username, (nada, user) => {
 //     if (req.body.password == req.body.passwordC) {
        if (user == null) {
          let hashedPassword = bu.Accounts.generateHash(req.body.password);
          bd.users
            .create(req.body.username, hashedPassword)
            .then(res.redirect("/login"));
        } else {
          res.redirect("/register");
        }
//      } else {
//        res.redirect("/register");
//      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
