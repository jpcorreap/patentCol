const express = require("express");
const router = express.Router();
const passport = require("passport");
const bd = require("../db/MongoUtils.js");
const bu = require("../db/BcryptUtils.js");

router.get("/login", function (req, res) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.post("/login", (req, res) => {
  console.log(req.body);
  bd.users.findByUsername(req.body.username, ).then(user => {
    try {
      console.log("se trajo al usuario", user);
      if ( bu.Accounts.validPassword(req.body.password, user.password)){
        passport.authenticate("local", { failureRedirect: "/login" }),
        function (req, res) {
          res.redirect("/");
        };
      }
    } catch (e) {
      res.status(500).send();
    }
  });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function (req, res) {
    res.render("profile", { user: req.user });
  }
);

router.get("/getUser", (req, res) => {
  return res.json(req.user || null);
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  try {
    bd.users.findByUsername(req.body.name, (nada,user) => {
      console.log( "Llegó el usuario ", user );
      if (user == null) {
        let hashedPassword = bu.Accounts.generateHash(req.body.password);
        bd.users
          .create(req.body.name, hashedPassword)
          .then(res.redirect("/login"));
      } else {
        console.log( req.body.name, "already exists!" );
        res.redirect("/register");
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
