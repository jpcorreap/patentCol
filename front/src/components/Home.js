import React from "react";
import Imagen from "../CORREA.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="row">
        <h1>Patent Search</h1>
      </div>
      <div className="row">
        <div className="col-5 text-justify">
          <p>
            While patenting, the State of Art is essential. We provide a
            truthful and powerful tool to search over 50.000 patents among a
            diversity of databases and APIs.
          </p>
        </div>
        <div className="col">
          <div className="img container">
            <img src={Imagen} alt=" " style={{ width: "50%" }}></img>
          </div>
        </div>
      </div>
      <br />

      <Link to={"/search"}>
        <button className="btn btn-primary">Get started</button>
      </Link>
      <br />
      <br />
      <p>
        Are you Colombian? You might be interested on our{" "}
        <Link to={"/paso1"}>
          Step-by-step how to patent in Colombia process.
        </Link>
      </p>
    </div>
  );
}

export default Home;
