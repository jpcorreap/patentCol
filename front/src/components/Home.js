import React from "react";
import Imagen from "../CORREA.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="row">
        <h1>Patent Search</h1>
      </div>
      <br/>
      <div className="row" id="parrafoInicio">
        <div className="col-6 text-justify">
          <p>
            While patenting, the State of Art is essential. We provide a
            truthful and powerful tool to search over 50.000 patents among a
            diversity of databases and APIs. The tool is designed to facilitate 
            the verification of the existence of a patent, since sometimes this 
            process can take a long time and become expensive. 
          </p>
          <p>
          Using our application you can make personalized searches with the following
          filters:
          </p>
          <li>
          Database filter: you can select which of the available to search and which not.
          </li>
          <li>
          Filter by date: select a date to find the same results or after this date
          </li>
          <li>
            Filter by keyword: from a keyword entered, search results that match
          </li>
          <li>
            Filter by the inventor: With the inventor's name, the results of patents made by the inventor can be obtained.
          </li>
          <br/>
          <p>
          If you are ready to find out if your invention is a unique idea or someone else has already proposed it, click on the following button.
          </p>
          <Link to={"/search"}>
        <button className="btn btn-primary">Get started</button>
      </Link>
        </div>
        <div className="col">
          <div className="img container" id="imgHome">
            <img src={Imagen} alt=" " style={{ width: "70%" }}></img>
          </div>
        </div>
      </div>
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
