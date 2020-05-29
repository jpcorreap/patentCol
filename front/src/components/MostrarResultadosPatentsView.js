import React from "react";
import IMG from "../patentsview.png";

function MostrarResultadosPatentsView(props) {
  return (
    <div>
      <div className="row text-center">
        <br />
        <div className="col-12" style={{ margin: "20px" }}>
          <img
            alt="Patentsview Logo"
            style={{ height: "90px" }}
            src={IMG}></img>
        </div>
      </div>
      <div>
        {props.source ? (
          props.source.map((patent) => (
            <div
              className="card border-info mb-3 col-md-12"
              key={patent.patent_id}>
              <div className="card-header">
                <h4>{patent.patent_title}</h4>
              </div>
              <div className="card-body">
                <p>
                  <strong>Type:</strong> {patent.patent_type}
                  <br />
                  <strong>Date:</strong> {patent.patent_date}
                  <br />
                  <strong>Inventor(s):</strong>{" "}
                  {patent.inventors.map((inventor) => {
                    return (
                      inventor.inventor_first_name +
                      " " +
                      inventor.inventor_last_name +
                      ", "
                    );
                  })}
                </p>
                <p className="card-text text-justify">
                  {patent.patent_abstract !== ""
                    ? patent.patent_abstract
                    : "No description provided. For mor details go to reference."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No results for that query.</p>
        )}
      </div>
    </div>
  );
}

export default MostrarResultadosPatentsView;
