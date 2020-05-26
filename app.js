const express = require("express");
const path = require("path");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const configurePassport = require("./configurePassport.js");
const configureBcrypt = require("./configureBcrypt.js");
const passportRoutes = require("./routes/passportRoutes.js");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "front/build")));

configurePassport(app);
configureBcrypt(app);

app.use("/", indexRouter);
app.use("/auth/", passportRoutes);

module.exports = app;
