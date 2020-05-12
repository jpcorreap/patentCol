import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PasoTitle from "./PasoTitle.js";

function Paso3_GoogleIPatents() {
  const [googleUtilityPatents, setGoogleUtilityPatents] = useState([]);

  // Hace GET de la base de datos
  useEffect(() => {
    fetch("/getGoogleIssuedPatents")
      .then((res) => res.json())
      .then((googleUtilityPatents) => {
        if (googleUtilityPatents) {
          setGoogleUtilityPatents(googleUtilityPatents);
          document.getElementById("spinnerCarga").style.visibility = "hidden";
          document.getElementById("spinnerCarga").style.position = "absolute";
        }
      });
  }, []);

  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado de la técnica" />
      <br />
      <br />
      <div className="row text-center">
        <div className="col text-center">
          <Link to={"paso3"}>
            <button className="btn btn-info">PatentsView</button>
          </Link>
        </div>
        <div className="col text-center">
          <Link to={"paso3_scope"}>
            <button className="btn btn-info">PatentScope</button>
          </Link>
        </div>
        <div className="col text-center">
          <Link to={"paso3_googleutility"}>
            <button className="btn btn-info">Google Utility Patents</button>
          </Link>
        </div>
        <div className="col text-center">
          <button className="btn btn-dark">Google Issued Patents</button>
        </div>
        <div className="col text-center">
          <Link to={"paso3_nasa"}>
            <button className="btn btn-info">NASA Patents</button>
          </Link>
        </div>
      </div>
      <br />
      <div className="row text-center">
        <br />
        <div className="col-12">
          <img
            alt="GooglePatents Logo"
            style={{ height: "150px" }}
            src="https://raw.githubusercontent.com/jpcorreap/patentCol/master/front/src/GooglePatents.png"></img>
        </div>
      </div>
      <br />
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="spinner-border text-warning"
              role="status"
              id="spinnerCarga">
              <span className="sr-only">
                Buscando información...
                <br />
              </span>
              <br />
            </div>
            <br />
            {googleUtilityPatents.map((patent) => (
              <div
                className="card border-warning mb-3 col-md-12"
                key={patent._id}>
                <div className="card-header">
                  <h4>{patent.title}</h4>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Date:</strong> {patent.date} <strong>Type:</strong>{" "}
                    Issued
                  </p>
                  <p className="card-text text-justify">{patent.abstract}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paso3_GoogleIPatents;
