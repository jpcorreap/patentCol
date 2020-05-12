import React, {useState, useEffect} from "react";
import PasoTitle from "./PasoTitle.js";

function Paso6() {
  const [docs, setDocs]=useState([]);
const [err, setErr]= useState(null);

const setupWS = () =>{
  const wss = new WebSocket(
    "ws://localhost:3001"
  );

  wss.onopen = () =>{
    console.log("WS client connected");

    wss.onmessage = (msg) => {
      console.log("WS got message", msg);

      setDocs(JSON.parse(msg.data));
    };
  };
};
useEffect(()=>{
  setupWS();

  fetch("/solicitudes")
  .then((res) => res.json())
  .then((res) =>{
      if(!res.succes){
          setErr(res.err);
          return;
      }
      setDocs(res.docs)
  })
  .catch((err) => setErr(err));
}, []);

  return (
    <div className="paso">
      <PasoTitle actual={6} nombre="Rastrear el trámite" />;
      <div className="container" id="menuRegisterSolicitud">
        <div className="container">
          <form action="/solicitud" method="post">
            <div className="form-group">
              <div className="row">
                <label>Numero de registro:</label>
                <input
                  type="text"
                  className="form-control"
                  id="registro"
                  name="registro"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <label>Titulo de la patente:</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="titulo"
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </div>
          </form>
        </div>
        </div>
        <h1>Reactive</h1>
        <div>{err?<div>rrre {JSON.stringify(err)} </div>:""}</div>
        {docs.map((d,i) => (
          <div
              className="card border-primary mb-3 col-md-3"
              key={i}
            >
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
  );
}

export default Paso6;
