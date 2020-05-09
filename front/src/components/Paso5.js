import React from "react";
import PasoTitle from "./PasoTitle.js";

function Paso5() {
  return (
    <div className="paso">
      <PasoTitle actual={5} nombre="Presenta tu idea" />
      <br />
      <p>
        Para enviar el formulario a la Superintendencia de Industria y Comercio
        de Colombia, puedes hacerlo de manera virtual por{" "}
        <a href="https://sipi.sic.gov.co/sipi/Extra/Default.aspx">
          Sistema de Propiedad Industrial (SIPI)
        </a>
      </p>
      <br />
    </div>
  );
}

export default Paso5;
