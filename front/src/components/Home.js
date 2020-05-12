import React from "react";
import { Link } from "react-router-dom";
{/* 
  Aqui tambien cambiaria un poco el formato de las carpetas creo que queda mas simple si en la parte de componentes cada pequeña carpeta 
  coge solo uno de los componentes para facilitar la lectura de codigo
*/} 
function Home() {
  return (
    <div>
      <div className="row">
        <h1>PatentCol</h1>
      </div>
      <div className="row">
        <p>Patentar nunca había sido tan fácil</p>
      </div>
      <br />

      <Link to={"/paso1"}>
        <button className="btn btn-primary">
          Comenzar
        </button>
      </Link>
    </div>
  );
}

export default Home;
