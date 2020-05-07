const bodyParser = require("body-parser");
var session = require("express-session");

const configureBcrypt = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(
    session({
      key: "user_sid",
      secret: "goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000,
      },
    })
  );
};

module.exports = configureBcrypt;