import React, { useState, useEffect } from "react";

function Busqueda(props) {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState(null);

  const setupWS = () => {
    const wss = new WebSocket("ws://localhost:3001");

    wss.onopen = () => {
      console.log("WS client connected");

      wss.onmessage = (msg) => {
        console.log("WS got message", msg);

        setDocs(JSON.parse(msg.data));
      };
    };
  };

  useEffect(() => {
    setupWS();

    fetch("/latestSearches")
      .then((res) => res.json())
      .then((res) => {
        if (!res.succes) {
          setErr(res.err);
          return;
        }
        setDocs(res.docs);
      })
      .catch((err) => setErr(err));
    /*setDocs([
      {
        text: "prueba 4",
        date: "2020-05-25T17:08:27.930Z",
        relativeDate: "hace 5 minutos",
      },
      {
        text: "Prueba 3",
        date: "2020-05-25T16:53:06.859Z",
        relativeDate: "hace 20 minutos",
      },
      {
        text: "Buenas noches",
        date: "2019-05-25T16:52:15.286Z",
        relativeDate: "hace unos deux años",
      },
      {
        text: "Chocorramo blanco",
        date: "2020-05-25T16:40:29.892Z",
        relativeDate: "hace 33 minutos",
      },
    ]);*/
  }, []);

  const enviarBusqueda = () => {
    let url = "/setSearch";
    let data = {
      text: document.getElementById("busqueda").value,
    };
    console.log(url);

    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };

  return (
    <div>
      <div className="container">
        <div className="form-group">
          <div className="row">
            <label>Palabras clave:</label>
            <input
              type="text"
              className="form-control"
              id="busqueda"
              name="registro"
              required
            />
            <button className="btn btn-primary" onClick={enviarBusqueda}>
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div>{err ? <div>rrre {JSON.stringify(err)} </div> : ""}</div>
      <h2>Ver las últimas 15 búsquedas:</h2>
      <div className="text-left">
        {docs.map((d, i) => (
          <div>
            <p key={i}>
              {d.text} {d.relativeDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Busqueda;
