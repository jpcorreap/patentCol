import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PasoTitle from "./PasoTitle.js";

function Paso3() {
  const [patentsView, setPatentsView] = useState([]);

  // Actualiza las patentes con la query dada por el usuario
  const actualizarConsulta = () => {
    let palabrasClave = document.getElementById("barraPalabras").value;
    let queriesPalabrasClave = "";

    palabrasClave.split(" ").forEach((palabra) => {
      queriesPalabrasClave +=
        ',{"_text_any":{"patent_title":"' + palabra + '"}}';
    });

    let fecha = document.getElementById("barraFecha").value;
    mostrarSpinner();

    async function fetchNewPatentsView() {
      console.log(
        "OJOO, va a hacer get a ",
        `https://www.patentsview.org/api/patents/query?q={"_and":[{"_gte":{"patent_date":"${fecha}"}}${queriesPalabrasClave}]}&f=["patent_id","patent_title","patent_firstnamed_assignee_city","inventor_first_name","patent_firstnamed_inventor_country","patent_type","patent_abstract","patent_date"]`
      );
      const res = await fetch(
        `https://www.patentsview.org/api/patents/query?q={"_and":[{"_gte":{"patent_date":"${fecha}"}}${queriesPalabrasClave}]}&f=["patent_id","patent_title","patent_firstnamed_assignee_city","inventor_first_name","patent_firstnamed_inventor_country","patent_type","patent_abstract","patent_date"]`
      );
      res
        .json()
        .then((res) => {
          setPatentsView(res.patents);
          ocultarSpinner();
        })
        .catch((err) => {});
    }
    fetchNewPatentsView();
  };

  // Oculta el spinner
  const ocultarSpinner = () => {
    document.getElementById("spinnerCarga").style.visibility = "hidden";
    document.getElementById("spinnerCarga").style.position = "absolute";
  };

  const mostrarSpinner = () => {
    document.getElementById("spinnerCarga").style.visibility = "visible";
    document.getElementById("spinnerCarga").style.position = "relative";
  };

  // Hace GET de la API
  useEffect(() => {
    async function fetchPatentsView() {
      const res = await fetch(
        'https://www.patentsview.org/api/patents/query?q={"_gte":{"patent_date":"2010-01-01"}}&f=["patent_id","patent_title","patent_firstnamed_assignee_city","inventor_first_name","patent_firstnamed_inventor_country","patent_type","patent_abstract","patent_date"]'
      );
      res
        .json()
        .then((res) => {
          setPatentsView(res.patents);
          ocultarSpinner();
        })
        .catch((err) => {
          ocultarSpinner();
        });
    }
    fetchPatentsView();
  }, []);

  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado de la técnica" />
      <br />
      <br />
      <div className="row text-center">
        <div className="col text-center">
          <button className="btn btn-dark">PatentsView</button>
        </div>
        <div className="col text-center">
          <Link to={"paso3_scope"}>
            <button className="btn btn-info">PatentScope</button>
          </Link>
        </div>
        <div className="col text-center">
          <Link to={"paso3_googleutility"}>
            <button className="btn btn-info">Google Utility Patents</button>
          </Link>
        </div>
        <div className="col text-center">
          <Link to={"paso3_googleissued"}>
            <button className="btn btn-info">Google Issued Patents</button>
          </Link>
        </div>
        <div className="col text-center">
          <Link to={"paso3_nasa"}>
            <button className="btn btn-info">NASA Patents</button>
          </Link>
        </div>
      </div>
      <br />

      <div>
        <div className="row">
          <div className="col-5">
            <img
              style={{ width: "100%" }}
              alt="PatentsView Logo"
              id="imagenAHH"
              src="https://www.patentsview.org/web/img/f34f24560eeb9097579c2be6fa29f5a7.logo_2x.png"></img>
          </div>
          <div className="col-1"></div>
          <div className="col-5 text-right">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Palabras clave"
              aria-label="Search"
              id="barraPalabras"
            />
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Posteriores a la fecha (AAAA-MM-DD)"
              aria-label="Search"
              id="barraFecha"
            />
          </div>
          <div className="col">
            <button
              style={{
                color: "blue",
                width: "100%",
                height: "70px",
              }}
              onClick={actualizarConsulta}
              className="btn btn-info my-2 my-sm-0">
              <img
                alt="Filter button"
                src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/filter-512.png"
                width="100%"></img>
            </button>
          </div>
        </div>
        <div className="container">
          <br />
          <div className="row justify-content-center">
            <div
              className="spinner-border text-info"
              role="status"
              id="spinnerCarga">
              <span className="sr-only">
                Buscando información...
                <br />
              </span>
              <br />
            </div>
            {patentsView != null ? (
              patentsView.map((patent) => (
                <div
                  className="card border-info mb-3 col-md-12"
                  key={patent.patent_id}>
                  <div className="card-header">
                    <h4>{patent.patent_title}</h4>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Type:</strong> {patent.patent_type}
                      {" - "}
                      <strong>Date:</strong> {patent.patent_date}
                      {" - "}
                      <strong>Inventor(s):</strong>{" "}
                      {patent.inventors.map((inventor) => {
                        return (
                          inventor.inventor_first_name +
                          " (ID " +
                          inventor.inventor_key_id +
                          ") "
                        );
                      })}
                    </p>
                    <p className="card-text text-justify">
                      {patent.patent_abstract}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>
                No se encontraron resultados con ese filtro, por favor busque
                nuevamente.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
<div>
        <StyledInput {...inputProps} placeholder="Type in here" />
        <span>Value: {inputProps.value} </span>
      </div>
      <div>
        <div>Choices: {checkbox.state.join(",")}</div>
        <label>
          <Checkbox {...checkbox} value="apple" />
          Apple
        </label>
        <label>
          <Checkbox {...checkbox} value="orange" />
          Orange
        </label>
        <label>
          <Checkbox {...checkbox} value="watermelon" />
          Watermelon
        </label>
      </div>
*/

export default Paso3;
