import React, {useState, useEffect} from "react";

function Solicitudes(){
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

return(
    <div className="Solicitudes">
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
          <div key={i}>{d.nombre}</div>
        ))}
    </div>
);
}



export default Solicitudes;