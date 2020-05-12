const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
require("dotenv").config();

const url =process.env.MONGOURL;

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

  //creates a new user of the application
  mu.users.create = (username, password) =>
    mu.connect().then((client) => {
      console.log(
        "Se conectó a la base de datos y va a guardar ",
        username,
        ":",
        password
      );
      const usuarios = client.db("patentCol").collection("usuarios");

      return usuarios
        .insertOne({ username: username, password: password })
        .finally(() => client.close());
    });

  // Get a specific user by username
  mu.users.findByUsername = (user, cb) =>
    mu.connect().then((client) => {
      const usuarios = client.db("patentCol").collection("usuarios");

      return usuarios
        .findOne({ username: user })
        .finally(() => client.close())
        .then((user) => {
          cb(null, user);
        });
    });

  mu.users.deleteUser = (userID) =>
    mu.connect().then((client) => {
      const usuarios = client.db("patentCol").collection("usuarios");
      return usuarios
        .remove({ _id: new ObjectID(userID) })
        .finally(() => client.close())
        .then((user) => {
          cb(null, user);
        });
    });

  // Get a specific user by id
  mu.users.findOneById = (id, cb) =>
    mu.connect().then((client) => {
      const usuarios = client.db("patentCol").collection("usuarios");

      // when searching by id we need to create an ObjectID
      return usuarios
        .findOne({ _id: new ObjectID(id) })
        .finally(() => client.close())
        .then((user) => {
          cb(null, user);
        });
    });

  mu.getSolicitudes = () =>
    mu.connect().then((client) =>
      client
        .db("patentCol")
        .collection("solicitudes")
        .find({})
        .toArray()
        .finally(() => client.close())
    );

  mu.createSolicitud = (username, body) =>
    mu.connect().then((client) => {
      console.log("OJOOOO! LLegó a Crear Solicitud con el body ", body);
      let nuevoTitulo = body.registro;
      let nuevaDescripcion = body.titulo;
      client
        .db("patentCol")
        .collection("solicitudes")
        .insertOne({
          inventor: username,
          nombre: nuevoTitulo,
          descripcion: nuevaDescripcion,
        })
        .finally(() => client.close());
    });

  mu.listenForChanges = (notifyAll) => {
    console.log("Listening for changes");
    return mu.connect().then((client) => {
      const cursor = client.db("patentCol").collection("solicitudes").watch();

      cursor.on("change", (data) => {
        console.log("Mongo change", data);
        mu.getSolicitudes().then((docs) => {
          notifyAll(JSON.stringify(docs));
        });
      });
    });
  };

  mu.patents = {};

  mu.patents.getPatentScope = () =>
    mu.connect().then((client) =>
      client
        .db("patentCol")
        .collection("patentscope")
        .find({})
        .limit(25)
        .skip(Math.floor(Math.random() * 1500))
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close())
    );

  mu.patents.getGoogleUtilityPatents = () =>
    mu.connect().then((client) =>
      client
        .db("patentCol")
        .collection("googleUtilityPatents")
        .find({})
        .limit(25)
        .skip(Math.floor(Math.random() * 1500))
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close())
    );

  mu.patents.getGoogleIssuedPatents = () =>
    mu.connect().then((client) =>
      client
        .db("patentCol")
        .collection("googleReissuePatents")
        .find({})
        .limit(20)
        .skip(Math.floor(Math.random() * 1500))
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close())
    );

  mu.patents.getNasaPatents = () =>
    mu.connect().then((client) =>
      client
        .db("patentCol")
        .collection("nasaPatents")
        .find({})
        .limit(20)
        .skip(Math.floor(Math.random() * 1500))
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close())
    );

  return mu;
}

module.exports = MongoUtils();
