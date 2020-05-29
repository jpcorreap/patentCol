import React, { useState, useEffect } from "react";
import MostrarResultados from "./MostrarResultados.js";
import MostrarResultadosPatentsView from "./MostrarResultadosPatentsView.js";
import MostrarResultadosNasa from "./MostrarResultadosNasa.js";
import DashboardBusqueda from "./DashboardBusqueda.js";
import BotonesCambio from "./BotonesCambio.js";

function Busqueda() {
  const [query, setQuery] = useState({});
  const [actual, setActual] = useState("");
  const [patentsView, setPatentsView] = useState(null);
  const [googleUPatents, setGoogleUPatents] = useState(null);
  const [googleIPatents, setGoogleIPatents] = useState(null);
  const [patentScope, setPatentScope] = useState(null);
  const [nasaPatents, setNasaPatents] = useState(null);

  const actualizarPatentsView = (query) => {
    let queriesPalabrasClave = "";

    query.text.split(" ").forEach((palabra) => {
      queriesPalabrasClave +=
        ',{"_text_any":{"patent_title":"' + palabra + '"}}';
    });

    let fecha = query.date;

    async function fetchNewPatentsView() {
      const res = await fetch(
        `https://www.patentsview.org/api/patents/query?q={"_and":[{"_gte":{"patent_date":"${fecha}"}}${queriesPalabrasClave}]}&f=["patent_id","patent_title","patent_firstnamed_assignee_city","inventor_first_name","patent_firstnamed_inventor_country","patent_type","patent_abstract","patent_date"]`
      );
      res
        .json()
        .then((res) => {
          setPatentsView(res.patents);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchNewPatentsView();
  };

  const actualizarGenerics = (query, colName) => {
    async function fetchGenerico(url, body) {
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
            switch (colName) {
              case "googleUtilityPatents":
                setGoogleUPatents(res);
                break;
              case "googleReissuePatents":
                setGoogleIPatents(res);
                break;
              case "patentscope":
                setPatentScope(res);
                break;
              case "nasaPatents":
                setNasaPatents(res);
                console.log("NASAAA", res);
                break;
              default:
                break;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    let newBody = { text: query.text };

    if (query.date !== "") {
      newBody.date = query.date;
      if (query.after !== "") {
        newBody.after = "true";
      } else if (query.equal !== "") {
        newBody.equal = "true";
      }
    }

    if (query.author !== "") {
      newBody.text += query.author;
    }
    fetchGenerico("/getGenericsPatents/" + colName, newBody);
  };

  function mostrarResultadosActuales() {
    switch (actual) {
      case "PatentsView":
        return <MostrarResultadosPatentsView source={patentsView} />;
      case "GoogleUPatents":
        return <MostrarResultados source={googleUPatents} />;
      case "GoogleIPatents":
        return <MostrarResultados source={googleIPatents} />;
      case "PatentScope":
        return <MostrarResultados source={patentScope} />;
      case "NasaPatents":
        return <MostrarResultadosNasa source={nasaPatents} />;
    }
  }

  function acaboDeHacerLosFetchs() {
    let acabo = false;

    if (query.fuentes.includes("GoogleUPatents")) {
      acabo = googleUPatents !== null;
    }
    if (query.fuentes.includes("GoogleIPatents")) {
      acabo = googleIPatents !== null;
    }
    if (query.fuentes.includes("PatentScope")) {
      acabo = patentScope !== null;
    }
    if (query.fuentes.includes("NASA")) {
      acabo = nasaPatents !== null;
    }
    if (query.fuentes.includes("PatentsView")) {
      acabo = patentsView !== null;
    }

    console.log("¿Hizo todos los fetchs? -> ", acabo);

    return acabo;
  }

  return (
    <div>
      {Object.entries(query).length === 0 ? (
        <DashboardBusqueda
          setter={setQuery}
          actualizar={{
            patentsView: actualizarPatentsView,
            generics: actualizarGenerics,
          }}
        />
      ) : (
        <div>
          {acaboDeHacerLosFetchs() ? (
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
          ) : (
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
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Busqueda;
