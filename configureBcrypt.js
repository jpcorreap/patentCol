const bodyParser = require("body-parser");
//var cookieParser = require("cookie-parser");
var session = require("express-session");
require("dotenv").config();

const configureBcrypt = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(
    session({
      key: "user_sid",
      secret: process.env.BCRYPT,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000,
      },
    })
  );
};

module.exports = configureBcrypt;