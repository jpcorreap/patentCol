import React from "react";

function MostrarResultados(props) {
  return (
    <div>
      {props.source.map((patent) => (
        <div className="card border-info mb-3 col-md-12" key={patent.patent_id}>
          <div className="card-header">
            <h4>{patent.patent_title}</h4>
          </div>
          <div className="card-body">
            <p>
              <strong>Type:</strong> {patent.patent_type}
              {" - "}
              <strong>Date:</strong> {patent.patent_date}
              {" - "}
              <strong>Inventor(s):</strong>{" "}
              {patent.inventors.map((inventor) => {
                return (
                  inventor.inventor_first_name +
                  " (ID " +
                  inventor.inventor_key_id +
                  ") "
                );
              })}
            </p>
            <p className="card-text text-justify">{patent.patent_abstract}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MostrarResultados;
