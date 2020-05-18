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
app.use("/", passportRoutes);


// BORRAR LINEAS COMENTADAS QUE NO SE USAN

// catch 404 and forward to error handler
// BORRÉ ESTE CÓDIGO PORQUE NO ESTAMOS USANDO HTTP ERRORS

// error handler
/*app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});*/

module.exports = app;
