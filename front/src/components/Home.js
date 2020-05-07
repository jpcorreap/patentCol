import React from "react";
import { Link } from "react-router-dom";

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