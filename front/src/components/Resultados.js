import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Paso3PatentsView from "./Paso3_PatentsView.js";
import Paso3PatentScope from "./Paso3_PatentScope.js";
import Paso3GoogleUPatents from "./Paso3_GoogleUPatents.js";
import Paso3GoogleIPatents from "./Paso3_GoogleIPatents.js";
import Paso3NasaPatents from "./Paso3_NasaPatents.js";
import BotonesCambio from "./BotonesCambio.js";
import Spinner from "./Spinner.js";

function Resultados(props) {
  const [googleUtilityPatents, setGoogleUtilityPatents] = useState([]);
  const [googleIssuedPatents, setgoogleIssuedPatentss] = useState([]);
  const [nasaPatents, setNasaPatents] = useState([]);

  const fetchGenerico = (url, body, setter) => {
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(body), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((respuestaEnJSON) => {
        if (respuestaEnJSON) {
          setter(respuestaEnJSON);
        }
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };

  return (
    <div>
      <Route exact path="/results">
        <h1>Resultados</h1>
        <br />
        <p>
          Consulta seleccionada en el componente anterior:
          <br />
          {JSON.stringify(props.query)}
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />

        <div style={{ margin: "50px" }}>
          <div className="row">
            <div className="col-12 text-center">
              <p>
                Choose one of your selected sources to display query results:
              </p>
            </div>
          </div>
          <BotonesCambio cualesSeMuestran={props.query.sources} actual={""} />
          <h3>Se le tiene la info mi pez:</h3>
        </div>
        <div>
          <Spinner mensaje="Fetching patents data..." />
        </div>
      </Route>

      <Route exact path="/results/patentsview">
        <BotonesCambio
          cualesSeMuestran={props.query.sources}
          actual={"PatentsView"}
        />
        <Paso3PatentsView />
      </Route>

      <Route exact path="/results/patentscope">
        <BotonesCambio actual={"PatentScope"} />
        <Paso3PatentScope />
      </Route>

      <Route exact path="/results/googleutility">
        <BotonesCambio
          cualesSeMuestran={props.query.sources}
          actual={"GoogleUPatents"}
        />
        <Paso3GoogleUPatents />
      </Route>

      <Route exact path="/results/googleissued">
        <BotonesCambio
          cualesSeMuestran={props.query.sources}
          actual={"GoogleIPatents"}
        />
        <Paso3GoogleIPatents />
      </Route>

      <Route exact path="/results/nasa">
        <BotonesCambio
          cualesSeMuestran={props.query.sources}
          actual={"NasaPatents"}
        />
        <Paso3NasaPatents />
      </Route>
    </div>
  );
}

export default Resultados;
