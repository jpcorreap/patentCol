const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
require("dotenv").config();

const url = "mongodb+srv://vaca3245:Desarrollo2299@cluster0-3mnil.mongodb.net/test?retryWrites=true&w=majority";

const dbName = "patentCol";

function MongoUtils() {
  const mu = {};

  // Connection to database
  mu.connect = () => {
    const client = new MongoClient(url, {
      useUnifiedTopology: true,
    });
    return client.connect();
  };

  // ----------------------
  // Users operations
  // ----------------------

  mu.users = {};

  // Create a new user of the application
  mu.users.create = (username, password) =>
    mu.connect().then((client) =>
      client
        .db(dbName)
        .collection("usuarios")
        .insertOne({
          username: username,
          password: password,
        })
        .finally(() => client.close())
    );

  // Get a specific user by username
  mu.users.findByUsername = (user, cb) =>
    mu.connect().then((client) =>
      client
        .db(dbName)
        .collection("usuarios")
        .findOne({ username: user })
        .finally(() => client.close())
        .then((user) => {
          cb(null, user);
        })
    );

  // Get a specific user by id
  mu.users.findOneById = (id, cb) =>
    mu.connect().then((client) => {
      client
        .db("quedateEnCasa")
        .collection("usuarios")
        .findOne({ _id: new ObjectID(id) }) // when searching by id we need to create an ObjectID
        .finally(() => client.close())
        .then((user) => {
          cb(null, user);
        });
    });



  return mu;

}
module.exports = MongoUtils();