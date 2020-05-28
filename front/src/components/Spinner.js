import React from "react";

function Spinner() {
  return (
    <div id="spinnerCarga">
      <div className="text-center" style={{ margin: "15px" }}>
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">
            Buscando información...
            <br />
          </span>
          <br />
        </div>
        <p style={{ fontSize: "1.2em" }}>
          <strong>Fetching data...</strong>
          <br />
        </p>
        <p>Desde Dashboard se trajo la query {JSON.stringify(query)}</p>
        <BotonesCambio cualesSeMuestran={query.fuentes} />
      </div>
    </div>
  );
}

export default Spinner;
