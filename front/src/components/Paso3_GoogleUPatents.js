import React, { useState, useEffect } from "react";

function Paso3_GoogleUPatents() {
  const [googleUtilityPatents, setGoogleUtilityPatents] = useState([]);

  // Hace GET de la base de datos
  useEffect(() => {
    fetch("/getGoogleUtilityPatents")
      .then((res) => res.json())
      .then((googleUtilityPatents) => {
        if (googleUtilityPatents) {
          setGoogleUtilityPatents(googleUtilityPatents);
        }
      });
  }, []);

  return (
    <div>
      <h3 className="text-info">Google Utility Patents:</h3>
      <div>
        <div className="container">
          <div className="row justify-content-center">
            {googleUtilityPatents.map((patent) => (
              <div className="card border-info mb-3 col-md-12" key={patent._id}>
                <div className="card-header">
                  <h4>{patent.title}</h4>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Date:</strong> {patent.date}
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

export default Paso3_GoogleUPatents;
