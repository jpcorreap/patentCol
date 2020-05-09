import React from "react";
import PasoTitle from "./PasoTitle.js";

function Paso4() {
  return (
    <div className="paso">
      <PasoTitle actual={4} nombre="Llenar formulario de la SIC" />
      <br />
      <p>
        Aquí pienso usar{" "}
        <a href="https://github.com/puppeteer/puppeteer">Puppeteer</a>, que
        genera PDFs fáciles desde Node.
      </p>
      <br />
    </div>
  );
}

export default Paso4;
