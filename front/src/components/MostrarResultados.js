import React from "react";
import Google from "../GooglePatents.png";
import PatentScope from "../PatentScope.png";

function MostrarResultados(props) {
  return (
    <div>
      <div className="row text-center">
        <br />
        <div className="col-12">
          <img
            alt="NASA Logo"
            style={{ height: "150px" }}
            src={props.img === "google" ? Google : PatentScope}></img>
        </div>
      </div>
      {props.source.length > 0 ? (
        props.source.map((patent) => (
          <div className="card border-info mb-3 col-md-12" key={patent._id}>
            <div className="card-header">
              <h4>{patent.title}</h4>
            </div>
            <div className="card-body">
              <p>
                <strong>Date:</strong> {patent.date}{" "}
              </p>
              <p className="card-text text-justify">{patent.abstract}</p>
              <p className="card-text text-justify">{patent.description}</p>
              {patent.link ? (
                <div>
                  <strong>Reference:</strong>{" "}
                  <a
                    href={patent.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    Patentscope
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))
      ) : (
        <p>There is no results for your query</p>
      )}
    </div>
  );
}

export default MostrarResultados;
