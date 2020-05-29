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
    let queryAutor = "";

    query.text.split(" ").forEach((palabra) => {
      queriesPalabrasClave +=
        ',{"_text_any":{"patent_title":"' + palabra + '"}}';
    });

    if (query.author != "") {
      queryAutor +=
        ',{"inventor_last_name":"' + query.author.split(" ")[0] + '"}';
    }

    let fecha = query.date == "" ? "1980-01-01" : query.date;

    let igual = query.equal == true ? "_eq" : "_gte";

    async function fetchNewPatentsView() {
      let url = `https://www.patentsview.org/api/patents/query?q={"_and":[{"${igual}":{"patent_date":"${fecha}"}}${queryAutor}${queriesPalabrasClave}]}&f=["patent_id","patent_title","patent_firstnamed_assignee_city","inventor_first_name","inventor_last_name","patent_firstnamed_inventor_country","patent_type","patent_abstract","patent_date"]`;

      console.log("VAA A ARMAAAAARSE CON ", url);

      const res = await fetch(url);
      res
        .json()
        .then((res) => {
          setPatentsView(res);
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
        return <MostrarResultadosPatentsView source={patentsView.patents} />;
      case "GoogleUPatents":
        return <MostrarResultados source={googleUPatents} img={"google"} />;
      case "GoogleIPatents":
        return <MostrarResultados source={googleIPatents} img={"google"} />;
      case "PatentScope":
        return <MostrarResultados source={patentScope} img={"googlenot"} />;
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

  function refreshPage() {
    setQuery({});
    setActual("");
    setPatentsView(null);
    setGoogleUPatents(null);
    setGoogleIPatents(null);
    setPatentScope(null);
    setNasaPatents(null);
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
          <button className="btn btn-secondary" onClick={refreshPage}>
            Search again
          </button>
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
