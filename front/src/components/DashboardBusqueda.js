import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashboardBusqueda(props) {
  const [err, setErr] = useState(null);
  const [docs, setDocs] = useState([]);

  let query = {};

  const setupWS = () => {
    const wss = new WebSocket("ws://localhost:3001");
    wss.onopen = () => {
      wss.onmessage = (msg) => {
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

  function validarQuery(query) {
    if (query.text === null || query.text === "") {
      return "You must provide at least one keyword";
    }

    if (
      query.text.includes("{") ||
      query.text.includes("}") ||
      query.text.includes("*") ||
      query.text.includes("?") ||
      query.text.includes("[") ||
      query.text.includes("]") ||
      query.text.includes('"') ||
      query.text.includes("&")
    ) {
      return "There can't be special characters in keywords";
    }

    if (query.fuentes.length === 0) {
      return "You must provide at least one source";
    }

    if (query.date !== null && query.date !== "") {
      if (query.date.split("-").length !== 3 || query.date.length !== 10) {
        return "Invalid date format";
      }
      if (query.after === false && query.equal === false) {
        return "While filtering by date you must specify after or equal";
      }
    }

    return "OK";
  }

  function hacerPostDeLaConsulta(text) {
    async function postear(keywords) {
      const res = await fetch("/setSearch", {
        method: "POST",
        body: JSON.stringify({ text: keywords }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      res
        .json()
        .then((res) => {
          console.log("Search posted?: ", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    postear(text);
  }

  const darQuery = () => {
    let fuentes = [];

    let query = {
      text: document.getElementById("busqueda").value,
      date: document.getElementById("fecha").value,
      author: document.getElementById("author").value,
      after: document.getElementById("fechaPosterior").checked,
      equal: document.getElementById("fechaIgual").checked,
    };

    if (document.getElementById("fiterPatentsView").checked) {
      fuentes.push("PatentsView");
      props.actualizar.patentsView(query);
    }

    if (document.getElementById("filterGoogleUPatents").checked) {
      fuentes.push("GoogleUPatents");
      props.actualizar.generics(query, "googleUtilityPatents");
    }

    if (document.getElementById("filterGoogleIPatents").checked) {
      fuentes.push("GoogleIPatents");
      props.actualizar.generics(query, "googleReissuePatents");
    }

    if (document.getElementById("filterPatentScope").checked) {
      fuentes.push("PatentScope");
      props.actualizar.generics(query, "patentscope");
    }

    if (document.getElementById("filterNASA").checked) {
      fuentes.push("NASA");
      props.actualizar.generics(query, "nasaPatents");
    }

    query.fuentes = fuentes;

    return query;
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
                        disabled
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
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      onClick={() => {
                        let query = darQuery();
                        let respuesta = validarQuery(query);
                        if (respuesta !== "OK") {
                          return toast.info(respuesta, {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                          });
                        } else {
                          hacerPostDeLaConsulta(query.text);
                          props.setter(query);
                        }
                      }}>
                      Search
                    </button>
                  </div>
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
                    <ul className="list-group" style={{ height: "200px" }}>
                      {docs.map((d, i) => (
                        <li className="list-group-item" key={i}>
                          <strongCriollo
                            onClick={() =>
                              (document.getElementById("busqueda").value =
                                d.text)
                            }>
                            {d.text}
                          </strongCriollo>
                          : {d.relativeDate}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col text-right">
                <div>
                  <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                  />
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
