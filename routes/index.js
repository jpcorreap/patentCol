const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils.js");

router.get("/", function (req, res) {
  res.render("home", { user: req.user });
});

// Data endpoints
router.get("/solicitudes", (req, res) => {
  db.getSolicitudes().then((docs) => {
    res.json({ succes: true, docs });
  });
});

router.get("/latestSearches", (req, res) => {
  db.getLatestSearches().then((docs) => {
    res.json({ succes: true, docs });
  });
});

router.post("/ingresarSolicitud/:username", (req, res) => {
  db.createSolicitud(req.params.username, req.body).then(
    res.json({ status: "OK" })
  );
});

router.post("/setSearch", (req, res) => {
  db.createSearch(req.body).then(res.json({ status: "OK" }));
});

router.get("/getPatentscope", function (req, res) {
  db.patents.getPatentScope().then((col) => {
    res.json(col);
  });
});

router.get("/getPatents/getPatentscope", function (req, res) {
  db.patents.getPatentScopeSpecific().then((col) => {
    res.json(col);
  });
});

router.get("/getGoogleUtilityPatents", function (req, res) {
  db.patents.getGoogleUtilityPatents().then((col) => {
    res.json(col);
  });
});

router.get("/getPatents/getGoogleUtilityPatents", function (req, res) {
  db.patents.getGoogleUtilityPatentsSpecific().then((col) => {
    res.json(col);
  });
});

router.get("/getGoogleIssuedPatents", function (req, res) {
  db.patents.getGoogleIssuedPatents().then((col) => {
    res.json(col);
  });
});

router.get("/getPatents/getGoogleIssuedPatents", function (req, res) {
  db.patents.getGoogleIssuedPatentsSpecific().then((col) => {
    res.json(col);
  });
});

router.get("/getNasaPatents", function (req, res) {
  db.patents.getNasaPatents().then((col) => {
    res.json(col);
  });
});

router.get("/getPatents/getNasaPatents", function (req, res) {
  db.patents.getNasaPatentsSpecific().then((col) => {
    res.json(col);
  });
});

router.post("/getGenericsPatents/:colName", function (req, res) {
  console.log("Entró a routes de Node js");
  db.patents.getGenericsPatents(req.params.colName, req.body).then((col) => {
    res.json(col);
  });
});

module.exports = router;
