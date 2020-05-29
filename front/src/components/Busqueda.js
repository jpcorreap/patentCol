import React, { useState, useEffect } from "react";
import MostrarResultados from "./MostrarResultados.js";
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
        return <MostrarResultados source={patentsView} />;
      case "GoogleUPatents":
        return <MostrarResultados source={googleUPatents} />;
      case "GoogleIPatents":
        return <MostrarResultados source={googleIPatents} />;
      case "PatentScope":
        return <MostrarResultados source={patentScope} />;
      case "NASA":
        return <MostrarResultados source={nasaPatents} />;
    }
  }

  function validarElFetch() {
    let bool1 = query.fuentes.includes("PatentsView") || patentsView !== null;
    let bool2 =
      query.fuentes.includes("GoogleUPatents") || googleUPatents !== null;
    let bool3 =
      query.fuentes.includes("GoogleIPatents") || googleIPatents !== null;
    let bool4 = query.fuentes.includes("PatentScope") || patentScope !== null;
    let bool5 = query.fuentes.includes("NASA") || nasaPatents !== null;

    let yaTermino = /*bool1 &&*/ bool2 && bool3 && bool4; /*&& bool5*/

    console.log("YAAA TERMINÓ??? ", yaTermino);
    return yaTermino;
  }

  function mostrarLasNecesarias() {
    if (Object.entries(query).length !== 0) {
      if (validarElFetch()) {
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
          actualizar={{
            patentsView: actualizarPatentsView,
            generics: actualizarGenerics,
          }}
        />
      ) : (
        <div>{mostrarLasNecesarias()}</div>
      )}
    </div>
  );
}

export default Busqueda;
