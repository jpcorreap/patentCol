import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PasoTitle from "./PasoTitle.js";
import Busqueda from "./Busqueda.js";

function Paso3PatentsView(props) {
  const [patentsView, setPatentsView] = useState([]);

  console.log("Está en PatentsView con el query ", props.query);
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

  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado del arte" />
      <br />
      <div className="descripcion text-justify">
        <p>
          Antes de presentar la solicitud se sugiere realizar una{" "}
          <strong>búsqueda del estado de la técnica</strong> en bases de datos
          para localizar documentos de patentes y de esta manera conocer si tu
          idea es una novedad en la invención.
        </p>
        <br />
        <p>
          Te recomendamos fuertemente hacer uso de nuestro poderoso buscador
          haciendo{" "}
          <Link to={"/search"}>
          click aqui.
          </Link>
        </p>
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

export default Paso3PatentsView;
