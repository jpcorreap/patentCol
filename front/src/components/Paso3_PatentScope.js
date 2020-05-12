import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PasoTitle from "./PasoTitle.js";

function Paso3_PatentScope() {
  const [patentScope, setPatentScope] = useState([]);
  const [hasError, setErrors] = useState(false);

  // Hace GET de la base de datos
  useEffect(() => {
    fetch("/getPatentscope")
      .then((res) => res.json())
      .then((patentScope) => {
        if (patentScope) {
          setPatentScope(patentScope);
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
            <button className="btn btn-info">API PatentsView</button>
          </Link>
        </div>
        <div className="col text-center">
          <button className="btn btn-primary">PatentScope</button>
        </div>
        <div className="col text-center">
          <button className="btn btn-info">Google Utility Patents</button>
        </div>
        <div className="col text-center">
          <button className="btn btn-info">Google Issued Patents</button>
        </div>
        <div className="col text-center">
          <button className="btn btn-info">NASA Patents</button>
        </div>
      </div>
      <br />
      <br />
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="spinner-info text-info"
              role="status"
              id="spinnerCarga">
              <span className="sr-only">Buscando información...</span>
            </div>
            {patentScope.map((patent) => (
              <div
                className="card border-success mb-3 col-md-12"
                key={patent._id}>
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
