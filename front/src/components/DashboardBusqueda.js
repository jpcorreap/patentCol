import React, { useState, useEffect } from "react";

function DashboardBusqueda(props) {
  const [err, setErr] = useState(null);
  const [docs, setDocs] = useState([]);

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
  }, []);

  // Esto le manda la consulta al papá
  const enviarBusqueda = () => {
    let fuentes = [];

    let query = {
      texto: document.getElementById("busqueda").value,
      fecha: document.getElementById("fecha").value,
      autor: document.getElementById("author").value,
      posterior: document.getElementById("fechaPosterior").checked,
      igual: document.getElementById("fechaIgual").checked,
    };

    if (document.getElementById("fiterPatentsView").checked) {
      fuentes.push("PatentsView");
      props.actualizar.patentsView(query.texto, query.fecha);
    }

    if (document.getElementById("filterEPO").checked) fuentes.push("EPO");

    if (document.getElementById("filterGoogleUPatents").checked)
      fuentes.push("GoogleUPatents");

    if (document.getElementById("filterGoogleIPatents").checked)
      fuentes.push("GoogleIPatents");

    if (document.getElementById("filterPatentScope").checked)
      fuentes.push("PatentScope");

    if (document.getElementById("filterNASA").checked) fuentes.push("NASA");

    query.fuentes = fuentes;

    // Se la manda al papá
    props.setter(query);
  };

  return (
    <div className="container" style={{ marginTop: "-38px" }}>
      <div className="form-group">
        <div className="row">
          <div className="col text-center">
            <h2>
              <strong>Patents Search</strong>
            </h2>
          </div>
        </div>
        <br />
        <div className="row">
          <input
            type="text"
            className="form-control"
            id="busqueda"
            name="busqueda"
            placeholder="Key words"
            required
            focus
          />
        </div>
        <br />
        <div className="row">
          <br />
          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <tituloFiltro style={{ marginLeft: "-10px" }}>
                  Filter
                </tituloFiltro>
              </div>
              <br />
              <div className="col text-left">
                <p className="descripcionFiltro">
                  By source <span style={{ color: "red" }}>*</span>
                </p>{" "}
                <div className="row formularioGenerico">
                  <div className="col-6">
                    <h5>APIs:</h5>
                    <div className="container" style={{ marginLeft: "5px" }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="fiterPatentsView"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="fiterPatentsView">
                        PatentsView
                      </label>
                      <br />
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="filterEPO"
                        disabled={true}
                      />
                      <label className="form-check-label" htmlFor="filterEPO">
                        European Patents Office
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <h5>Databases:</h5>
                    <div className="container" style={{ marginLeft: "5px" }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="filterGoogleUPatents"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterGoogleUPatents">
                        Google Utility Patents
                      </label>
                      <br />
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="filterGoogleIPatents"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterGoogleIPatents">
                        Google Issued Patents
                      </label>
                      <br />
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="filterPatentScope"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterPatentScope">
                        PatentScope
                      </label>
                      <br />
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="filterNASA"
                      />
                      <label className="form-check-label" htmlFor="filterNASA">
                        NASA Patents
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-left">
                    <descripcionFiltro>By date</descripcionFiltro>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="fecha"
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                  </div>
                  <div className="col-6 formularioGenerico2">
                    <br />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="fechas"
                        id="fechaPosterior"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="fechaPosterior">
                        After
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="fechas"
                        id="fechaIgual"
                      />
                      <label className="form-check-label" htmlFor="fechaIgual">
                        Equal
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-left">
                    <descripcionFiltro>By author</descripcionFiltro>
                  </div>
                </div>
                <div className="row" style={{ padding: "5px" }}>
                  <div className="col-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="author"
                        placeholder="Author's name"
                      />
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col text-right">
                <tituloFiltro>View latest searches</tituloFiltro>
              </div>
            </div>
            {err ? (
              <div className="text-right" style={{ marginBottom: "290px" }}>
                Error fetching data from GET /latestSearches:{" "}
                {JSON.stringify(err)}{" "}
              </div>
            ) : (
              <div>
                <br />
                <div className="text-left">
                  <div className="form-group" style={{ width: "100%" }}>
                    <div
                      className="form-control"
                      id="exampleFormControlSelect2"
                      style={{ height: "270px" }}>
                      {docs.map((d, i) => (
                        <p key={i}>
                          <strongCriollo
                            onClick={() =>
                              (document.getElementById("busqueda").value =
                                d.text)
                            }>
                            {d.text}
                          </strongCriollo>
                          : {d.relativeDate}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col text-right">
                <div>
                  <button className="btn btn-primary" onClick={enviarBusqueda}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBusqueda;
