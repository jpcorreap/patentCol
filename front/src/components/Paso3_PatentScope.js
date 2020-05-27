import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PasoTitle from "./PasoTitle.js";

function Paso3_PatentScope() {
  const [patentScope, setPatentScope] = useState([]);

  // Hace GET de la base de datos
  useEffect(() => {
    fetch("/getPatentscope")
      .then((res) => res.json())
      .then((patentScope) => {
        if (patentScope) {
          setPatentScope(patentScope);
          document.getElementById("spinnerCarga").style.visibility = "hidden";
          document.getElementById("spinnerCarga").style.position = "absolute";
        }
      });
  }, []);

  return (
    <div className="paso">
      <br />
      <div className="row text-center">
        <div className="col-12">
          <img
            alt="PatentScope Logo"
            style={{ height: "180px" }}
            src="https://raw.githubusercontent.com/jpcorreap/patentCol/master/front/src/PatentScope.png"></img>
        </div>
        <br />
        <br />
      </div>
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="spinner-border text-info"
              role="status"
              id="spinnerCarga">
              <span className="sr-only">
                Buscando información...
                <br />
              </span>
              <br />
            </div>
            <br />
            {patentScope.map((patent) => (
              <div className="card border-info mb-3 col-md-12" key={patent._id}>
                <div className="card-header">
                  <h4>{patent.title}</h4>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Date:</strong> {patent.date}.{" "}
                    <strong>Reference:</strong>{" "}
                    <a
                      href={patent.link}
                      target="_blank"
                      rel="noopener noreferrer">
                      Patentscope
                    </a>
                  </p>
                  <p className="card-text text-justify">{patent.description}</p>
                  <p>{patent.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paso3_PatentScope;
