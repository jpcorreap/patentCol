import React from "react";
import NASA from "../NASA.jpg";

function MostrarResultadosNasa(props) {
  return (
    <div>
      <div className="row text-center">
        <br />
        <div className="col-12">
          <img alt="NASA Logo" style={{ height: "150px" }} src={NASA}></img>
        </div>
      </div>
      <br />
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <br />
            <div className="container">
              <div className="row justify-content-center">
                {props.source.length > 0 ? (
                  props.source.map((patent) => (
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
                          {patent.date.split("T")[0]}
                        </p>
                        <p>
                          <strong>Status:</strong> {patent.status}
                        </p>
                        <p className="card-text text-justify">
                          <strong>Center: </strong> {patent.author}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>There is no results for your query</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostrarResultadosNasa;
