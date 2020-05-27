const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const moment = require("moment");
moment.locale("es");

require("dotenv").config();

const url = "mongodb+srv://vaca:vaca123@cluster0-3lhwp.mongodb.net/test?retryWrites=true&w=majority";

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
        .limit(15)
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
        .find({query})
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

  mu.patents.getPatentScopeSpecific = () =>
    mu.connect().then((client) =>
      client
        .db("patentSearch")
        .collection("patentscope")
        .find({$text:{$search: "\"Beam Wire\""}})
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

  mu.patents.getGoogleUtilityPatentsSpecific = () =>
    mu.connect().then((client) =>
      client
        .db("patentSearch")
        .collection("googleUtilityPatents")
        .find({$text:{$search: "\"Beam Wire\""}})
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

  mu.patents.getGoogleIssuedPatentsSpecific = () =>
    mu.connect().then((client) =>
      client
        .db("patentSearch")
        .collection("googleReissuePatents")
        .find({$text:{$search: "\"Beam Wire\""}})
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

  mu.patents.getNasaPatentsSpecific = () =>
    mu.connect().then((client) =>
      client
        .db("patentSearch")
        .collection("nasaPatents")
        .find({$text:{$search: "\"Wire\""}})
        .toArray()
        .finally(() => client.close())
    );


  return mu;
}

module.exports = MongoUtils();
