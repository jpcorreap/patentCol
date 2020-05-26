import React from "react";
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
      </div>
      <br />

      <Link to={"/search"}>
        <button className="btn btn-primary">Get started!</button>
      </Link>

      <br />
      <br />
      <p>
        Are you Colombian? You might be interested on our{" "}
        <Link to={"/paso1"}>How-to-do patent process</Link>
      </p>
    </div>
  );
}

export default Home;
