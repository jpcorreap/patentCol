import React, { useState, useEffect } from "react";
import MostrarResultados from "./MostrarResultados.js";
import DashboardBusqueda from "./DashboardBusqueda.js";
import BotonesCambio from "./BotonesCambio.js";

function Busqueda() {
  const [query, setQuery] = useState({});
  const [actual, setActual] = useState("");
  const [patentsView, setPatentsView] = useState([]);

  const ocultarSpinner = () => {
    document.getElementById("spinnerCarga").style.visibility = "hidden";
    document.getElementById("spinnerCarga").style.position = "absolute";
  };

  const mostrarSpinner = () => {
    document.getElementById("spinnerCarga").style.visibility = "visible";
    document.getElementById("spinnerCarga").style.position = "relative";
  };

  // Actualiza las patentes con la query dada por el usuario
  const actualizarPatentsView = (palabrasClave, fecha) => {
    let queriesPalabrasClave = "";

    palabrasClave.split(" ").forEach((palabra) => {
      queriesPalabrasClave +=
        ',{"_text_any":{"patent_title":"' + palabra + '"}}';
    });

    async function fetchNewPatentsView() {
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

  const actualizarGenerics = (/*palabrasClave, fecha*/) => {
    /*let queriesPalabrasClave = "";

    palabrasClave.split(" ").forEach((palabra) => {
      queriesPalabrasClave +=
        ',{"_text_any":{"patent_title":"' + palabra + '"}}';
    });*/

    async function fetchGenerico(url, body, setter) {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      res
        .json()
        .then((res) => {
          if (res) {
            console.log("Se obtuvo como respuesta: ", res);
          }
        })
        .catch((err) => {});
    }

    let newURL = "/getGenericsPatents/nasaPatents";
    let newBody = { text: "Training Exercise" };
    fetchGenerico(newURL, newBody);
  };

  function mostrarResultadosActuales() {
    switch (actual) {
      case "PatentsView":
        return <MostrarResultados source={patentsView} />;
      default:
        return <h3>Aquí se van a mostrar resultados de {actual}</h3>;
    }
  }

  function validarCualesSeMuestran() {
    if (Object.entries(query).length !== 0) {
      if (query.fuentes.includes("PatentsView") && patentsView.length !== 0) {
        return (
          <div>
            <BotonesCambio
              cualesSeMuestran={query.fuentes}
              actual={actual}
              setActual={setActual}
            />
            <br />
            <br />
            {mostrarResultadosActuales()}
          </div>
        );
      }
    }
  }

  return (
    <div>
      {Object.entries(query).length === 0 ? (
        <DashboardBusqueda
          setter={setQuery}
          actualizar={{ patentsView: actualizarPatentsView }}
        />
      ) : (
        <div>
          <div id="spinnerCarga">
            <div className="text-center" style={{ margin: "15px" }}>
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">
                  Buscando información...
                  <br />
                </span>
                <br />
              </div>
              <p style={{ fontSize: "1.2em" }}>
                <strong>Fetching data...</strong>
                <br />
              </p>
              <p>Desde Dashboard se trajo la query {JSON.stringify(query)}</p>
            </div>
          </div>

          {validarCualesSeMuestran()}
        </div>
      )}
      <button className="btn btn-error" onClick={actualizarGenerics}>
        Mandar esa cosa
      </button>
    </div>
  );
}

export default Busqueda;
