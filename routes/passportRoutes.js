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
  bd.users.findByUsername(req.body.username).then((user) => {
    try {
      if (bu.Accounts.validPassword(req.body.password, user.password)) {
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
  res.redirect("http://localhost:3000/");
});

router.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function (req, res) {
    res.render("profile", { user: req.user });
  }
);

// ----------------
// Data endpoints
// ----------------

// Get information of current user
router.get("/getUser", (req, res) => {
  return res.json(req.user || null);
});

module.exports = router;
