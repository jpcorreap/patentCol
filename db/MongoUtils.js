const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const moment = require("moment");
require("dotenv").config();
const url = process.env.MONGOURL;

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
          // eslint-disable-next-line no-undef
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

  mu.getLatestSearches = () =>
    mu.connect().then((client) =>
      client
        .db("patentCol")
        .collection("busquedas")
        .find({})
        .limit(7)
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close())
        .then((docs) =>
          docs.map((doc) => ({
            text: doc.text,
            date: doc.date,
            relativeDate: moment(doc.date).fromNow(),
          }))
        )
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

  mu.createSearch = (body) =>
    mu.connect().then((client) => {
      let text = body.text;
      let date = moment()._d;
      return client
        .db("patentCol")
        .collection("busquedas")
        .insertOne({ text, date })
        .finally(() => client.close());
    });

  mu.listenForChanges = (notifyAll) => {
    console.log("Listening for changes");
    return mu.connect().then((client) => {
      const cursor = client.db("patentCol").collection("busquedas").watch();

      cursor.on("change", (data) => {
        console.log("Mongo change", data);
        mu.getLatestSearches().then((docs) => {
          notifyAll(JSON.stringify(docs));
        });
      });
    });
  };

  mu.patents = {};

  mu.patents.getSpecific = (collection, query) =>
    mu.connect().then((client) =>
      client
        .db("patentSearch")
        .collection(collection)
        .find({ query })
        .toArray()
        .finally(() => client.close())
    );

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
        .db("patentSearch")
        .collection("nasaPatents")
        .find({})
        .limit(20)
        .skip(Math.floor(Math.random() * 1500))
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close())
    );

  mu.patents.getGenericsPatents = (colName, body) => {
    console.log(
      "\n\nLlegó a MongoUtils al generics con los parámetros ",
      colName,
      body
    );

    let filtro = { $text: { $search: "'" + body.text + "'" } };

    if (body.date != null) {
      let fecha = new Date(Date.parse(body.date + "T00:00:00.000+00:00"));
      if (body.after != null) {
        filtro.date = { $gt: fecha };
      } else if (body.equal != null) {
        filtro.date = { $eq: fecha };
      }
    }

    console.log("Se armó el filtro ", filtro);

    return mu.connect().then((client) =>
      client
        .db("patentSearch")
        .collection(colName)
        .find(filtro)
        .limit(20)
        .toArray()
        .finally(() => client.close())
    );
  };

  return mu;
}

module.exports = MongoUtils();
