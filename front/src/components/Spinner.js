import React from "react";

function Spinner(props) {
  return (
    <div className="text-center" style={{ margin: "50px" }}>
      <div className="spinner-border text-info" role="status" id="spinnerCarga">
        <span className="sr-only">
          Buscando información...
          <br />
        </span>
        <br />
      </div>
      <p>
        <strong>{props.mensaje}</strong>
      </p>
    </div>
  );
}

export default Spinner;
