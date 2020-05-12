import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PasoTitle from "./PasoTitle.js";

function Paso3_NasaPatents() {
  const [googleUtilityPatents, setGoogleUtilityPatents] = useState([]);

  // Hace GET de la base de datos
  useEffect(() => {
    fetch("/getNasaPatents")
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
          <Link to={"paso3_googleissued"}>
            <button className="btn btn-info">Google Issued Patents</button>
          </Link>
        </div>
        <div className="col text-center">
          <button className="btn btn-dark">NASA Patents</button>
        </div>
      </div>
      <br />
      <div className="row text-center">
        <br />
        <div className="col-12">
          <img
            alt="NASA Logo"
            style={{ height: "150px" }}
            src="https://raw.githubusercontent.com/jpcorreap/patentCol/master/front/src/NASA.jpg"></img>
        </div>
      </div>
      <br />
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="spinner-border text-danger"
              role="status"
              id="spinnerCarga">
              <span className="sr-only">
                Buscando información...
                <br />
              </span>
              <br />
            </div>
            <br />
            <div className="container">
              <div className="row justify-content-center">
                {googleUtilityPatents.map((patent) => (
                  <div
                    className="card border-danger mb-3 col-md-5"
                    key={patent._id}
                    style={{ marginRight: "20px" }}>
                    <div className="card-header">
                      <h4>{patent.title}</h4>
                    </div>
                    <div className="card-body">
                      <p>
                        <strong>Expiration date:</strong>{" "}
                        {patent["expiration-date"]} <strong>Status:</strong>{" "}
                        {patent.status}
                      </p>
                      <p className="card-text text-justify">
                        <strong>Center: </strong> {patent.center}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paso3_NasaPatents;
