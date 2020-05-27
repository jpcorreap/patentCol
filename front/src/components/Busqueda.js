import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  }, []);

  const enviarBusqueda = () => {
    let url = "/setSearch";
    let data = {
      text: document.getElementById("busqueda").value,
    };

    let fuentes = [];

    if (document.getElementById("fiterPatentsView").checked) {
      fuentes.push("PatentsView");
    }
    if (document.getElementById("filterEPO").checked) {
      fuentes.push("EPO");
    }
    if (document.getElementById("filterGoogleUPatents").checked) {
      fuentes.push("GoogleUPatents");
    }
    if (document.getElementById("filterGoogleIPatents").checked) {
      fuentes.push("GoogleIPatents");
    }
    if (document.getElementById("filterPatentScope").checked) {
      fuentes.push("PatentScope");
    }
    if (document.getElementById("filterNASA").checked) {
      fuentes.push("NASA");
    }

    let query = {
      text: document.getElementById("busqueda").value,
      sources: fuentes,
      dateAfter: document.getElementById("fechaPosterior").checked,
      date: document.getElementById("fecha").value,
    };

    props.seteadorDeConsultas(query);

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
              focus={true}
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
                  <descripcionFiltro>By source</descripcionFiltro>
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
                        />
                        <label className="form-check-label" htmlFor="filterEPO">
                          European Patent Office
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
                        <label
                          className="form-check-label"
                          htmlFor="filterNASA">
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
                        <label
                          className="form-check-label"
                          htmlFor="fechaIgual">
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
                    <div className="form-group">
                      <select
                        multiple
                        className="form-control"
                        id="exampleFormControlSelect2"
                        style={{ height: "270px" }}>
                        {docs.map((d, i) => (
                          <option key={i}>
                            {d.text} {d.relativeDate}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col text-center">
                  <Link to={"/results"}>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%", height: "100%" }}
                      onClick={enviarBusqueda}>
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Busqueda;
