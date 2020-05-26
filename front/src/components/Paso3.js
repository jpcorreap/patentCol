import React, { useState, useEffect } from "react";
import PasoTitle from "./PasoTitle.js";

function Paso3() {
  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado de la técnica" />
      <br />
      <br />
      <div className="container">
        <p>
          Aquí tiene que buscar qué cosas hay hechas. Le recomendamos usar
          nuestra base de datos.
        </p>
      </div>
    </div>
  );
}

export default Paso3;
