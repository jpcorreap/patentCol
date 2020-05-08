const passport = require("passport");
const Strategy = require("passport-local").Strategy;
var flash = require("connect-flash");
const db = require("./db/MongoUtils");
const bu = require("./db/BcryptUtils.js");

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    console.log("OJOOO! Entró a localStrategy a validar: ", username, ":", password);
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (!bu.Accounts.validPassword(user, password)) { return cb(null, false); }
      return cb(null, user);
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  console.log( "Va a deserializar con el ID ", id );
  db.users.findOneById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

const configurePassport = (app) => {
  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  app.use(require("cookie-parser")());
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(require("express-session")({
    secret: "es un secreto",
    resave: true,
    saveUninitialized: true
  }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());

  // Imports in order to merge Passport with Bcrypt
  app.use(flash());
};

module.exports = configurePassport;