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
      .catch((err) =>
        setErr(err)
      ); /*
    setDocs([
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
        relativeDate: "hace 30 minutos",
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
            <h2>
              <strong>Búsqueda de patentes</strong>
            </h2>
          </div>
          <br />
          <div className="row">
            <input
              type="text"
              className="form-control"
              id="busqueda"
              name="registro"
              required
            />
          </div>
          <br />
          <div className="row">
            <div className="col-7">
              <div className="row">
                <div className="col text-left">
                  <h4>
                    <strong>Fuente de los datos</strong>
                  </h4>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6">
                  <h5>APIs:</h5>
                  <div className="container" style={{ marginLeft: "5px" }}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      PatentsView
                    </label>
                    <br />
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      European Patent Option
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <h5>Bases de datos:</h5>
                  <div className="container" style={{ marginLeft: "5px" }}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      Google Utility Patents
                    </label>
                    <br />
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      Google Issued Patents
                    </label>
                    <br />
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      PatentScope
                    </label>
                    <br />
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      NASA Patents
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div>{err ? <div>rrre {JSON.stringify(err)} </div> : ""}</div>
              <div className="row">
                <div className="col text-center">
                  <h4>
                    <strong>Búsquedas recientes</strong>
                  </h4>
                </div>
              </div>
              <br />
              <div className="text-left">
                <div class="form-group">
                  <select
                    multiple
                    class="form-control"
                    id="exampleFormControlSelect2">
                    {docs.map((d, i) => (
                      <option key={i}>
                        {d.text} {d.relativeDate}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-10">
              <div className="row">
                <div className="col text-left">
                  <h4>
                    <strong>Filtrado de fechas</strong>
                  </h4>
                </div>
              </div>
              <br />
              <div className="container" style={{ marginLeft: "5px" }}>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Fecha exactamente igual a:
                  </label>
                  <br />
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                  />
                  <label class="form-check-label" for="exampleRadios2">
                    Fecha posterior a:
                  </label>
                </div>
              </div>
            </div>
            <div className="col text-right">
              <button
                className="btn btn-primary"
                style={{ width: "100%", height: "100%", fontSize: "1.5em" }}
                onClick={enviarBusqueda}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Busqueda;
