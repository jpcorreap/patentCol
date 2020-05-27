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

  useEffect(() => {
    // VACAAA, ACÁ VAN LOS FETCHS DE SU DATAENDPOINT.
    // UN FETCH POR CADA DATO QUE SE PIDA EN PROPS.QUERY
    fetchGenerico(
      "url en el back para Google Issued Patents",
      { texto: "query que se le va a mandar a Mongo" },
      setGoogleUtilityPatents
    );

    fetchGenerico(
      "url en el back para Google Patents",
      { texto: "query que se le va a mandar a Mongo" },
      setGoogleUtilityPatents
    );
  }, []);

  return (
    <div>
      <Route exact path="/results">
        <h1>¡Bieeenvenido a los resultados!</h1>
        <br />
        <p>
          Consulta seleccionada en el componente anterior:
          <br />
          {JSON.stringify(props.query)}
        </p>
        <br />
        <br />
        <Spinner mensaje="Fetching all data..." />
        <br />
        <br />
        <br />
        <p>
          Vaca, desde este componente Resultados es donde le digo que hay que
          hacer los fetchs correspondientes al back, todo según el props.query,
          y luego mostrar los botones de abajo según la info que se trajo del
          back
        </p>
        <BotonesCambio actual={null} />
      </Route>

      <Route exact path="/results/patentsview">
        <BotonesCambio actual={"PatentsView"} />
        <Paso3PatentsView />
      </Route>

      <Route exact path="/results/patentscope">
        <BotonesCambio actual={"PatentScope"} />
        <Paso3PatentScope />
      </Route>

      <Route exact path="/results/googleutility">
        <BotonesCambio actual={"GoogleUPatents"} />
        <Paso3GoogleUPatents />
      </Route>

      <Route exact path="/results/googleissued">
        <BotonesCambio actual={"GoogleIPatents"} />
        <Paso3GoogleIPatents />
      </Route>

      <Route exact path="/results/nasa">
        <BotonesCambio actual={"NasaPatents"} />
        <Paso3NasaPatents />
      </Route>
    </div>
  );
}

export default Resultados;
