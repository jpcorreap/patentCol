import React, { useState, useEffect } from "react";
import PasoTitle from "./PasoTitle.js";

function Paso6(props) {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState(null);

  const setupWS = () => {
    const wss = new WebSocket("ws://patentcol.herokuapp.com");

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

    fetch("/solicitudes")
      .then((res) => res.json())
      .then((res) => {
        if (!res.succes) {
          setErr(res.err);
          return;
        }
        setDocs(res.docs);
      })
      .catch((err) => setErr(err));
  }, []);

  const enviarSolicitud = () => {
    let url = "/ingresarSolicitud/" + props.username;
    let data = {
      registro: document.getElementById("titulo").value,
      titulo: document.getElementById("descripcion").value,
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
    <div className="paso">
      <PasoTitle actual={6} nombre="Rastrear el trámite" />
      <p>El proceso de validación ante la SIC consta de 5 etapas:</p>
      <ol>
        <li>Examen de forma.</li>
        <li>Publicación y oposiciones.</li>
        <li>Petición del examen de patentabilidad.</li>
        <li>Examen de patentabilidad.</li>
        <li>Examen de fondo</li>
      </ol>
      Haga{" "}
      <a href="https://sipi.sic.gov.co/sipi/Extra/Default.aspx">click aquí</a>{" "}
      para conocer en cuál etapa va su solicitud.
      {props.username ? (
        <div>
          <div className="container" id="menuRegisterSolicitud">
            <br />
            <br />
            <h4>
              {props.username}, por favor comparta con los usuarios de PatentCol
              cuál es su solicitud actual:
            </h4>
            <div className="container">
              <div className="form-group">
                <div className="row">
                  <label>Título:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="registro"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <label>Breve descripción:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="titulo"
                    required
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={enviarSolicitud}>
                  Enviar solicitud a PatentCol
                </button>
              </div>
            </div>
          </div>
          <br />
          <h4>Solicitudes de otros usuarios en tiempo real:</h4>
          <div>{err ? <div>rrre {JSON.stringify(err)} </div> : ""}</div>
          <div className="row">
            {docs.map((d, i) => (
              <div className="card border-primary mb-3 col-md-3" key={i}>
                <div className="card-header">
                  <div>
                    <p className="card-text">
                      <strong>Autor: </strong>
                      {d.inventor}
                    </p>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-12">
                      <h4>{d.nombre}</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{d.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>
            Inicie sesión para enviar tu solicitud y ver solicitudes de otros
            usuarios en tiempo real.
          </p>
        </div>
      )}
    </div>
  );
}

export default Paso6;
