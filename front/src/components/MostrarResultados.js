import React from "react";

function MostrarResultados(props) {
  return (
    <div>
      {props.source.map((patent) => (
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
                <a href={patent.link} target="_blank" rel="noopener noreferrer">
                  Patentscope
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MostrarResultados;
