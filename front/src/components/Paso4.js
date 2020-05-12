import React from "react";
import PasoTitle from "./PasoTitle.js";

function Paso4() {
  return (
    <div className="paso text-center">
      <PasoTitle actual={4} nombre="Llenar formulario de la SIC" />
      <br />
      <br />
      <img
        alt="Microsoft Word Icon"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Microsoft_Word_2013_logo.svg/1200px-Microsoft_Word_2013_logo.svg.png"
        width="150px"></img>
      <br />
      <p>
        Descargue el formulario de la SIC haciendo clic{" "}
        <a href="https://legalwatch-ce193.firebaseapp.com/assets/fotos/descargar.docx">
          aquí
        </a>
        .
      </p>
    </div>
  );
}

export default Paso4;
