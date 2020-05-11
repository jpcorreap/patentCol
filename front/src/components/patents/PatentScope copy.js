import React, { useState, useEffect } from "react";

function PatentScope() {
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
    <div>
      <h3 className="text-success">Patentscope:</h3>
      <div className="container">
        <div className="row justify-content-center">
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
  );
}

export default PatentScope;
