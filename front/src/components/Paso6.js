import React from "react";
import PasoTitle from "./PasoTitle.js";

function Paso6() {
  return (
    <div className="paso">
      <PasoTitle actual={6} nombre="Rastrear el trámite" />
      <p>El proceso de validación ante la SIC consta de 5 etapas:</p>
      <ol>
        <li>Examen de forma.</li>
        <li>Publicación y oposiciones.</li>
        <li>Petición del examen de patentabilidad.</li>
        <li>Examen de patentabilidad.</li>
        <li>Examen de fondo</li>
      </ol>
      Haga{" "}
      <a href="https://sipi.sic.gov.co/sipi/Extra/Default.aspx">click aquí</a>{" "}
      para conocer en cuál etapa va su solicitud.
    </div>
  );
}

export default Paso6;
