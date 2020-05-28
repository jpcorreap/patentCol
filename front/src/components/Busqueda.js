import React, { useState, useEffect } from "react";
import MostrarResultados from "./MostrarResultados.js";
import DashboardBusqueda from "./DashboardBusqueda.js";
import BotonesCambio from "./BotonesCambio.js";

function Busqueda() {
  const [query, setQuery] = useState({});
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

  return (
    <div>
      {Object.entries(query).length !== 0 ? (
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
          <BotonesCambio cualesSeMuestran={query.fuentes} />
        </div>
      ) : (
        <DashboardBusqueda
          setter={setQuery}
          actualizar={{ patentsView: actualizarPatentsView }}
        />
      )}
      {patentsView.length !== 0 && Object.entries(query).length !== 0 ? (
        <div>
          <BotonesCambio cualesSeMuestran={query.fuentes} />
          <MostrarResultados source={patentsView} />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Busqueda;
