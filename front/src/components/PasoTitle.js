import React from "react";
import { Link } from "react-router-dom";

function PasoTitle(props) {
  if (props.actual === 1) {
    return (
      <div>
        <div className="row text-center">
          <div className="col-3"></div>
          <div className="col">
            <span className="tituloPaso">Paso {props.actual} de 6</span>
          </div>
          <div className="col-3 text-right">
            <Link to={"/paso2"}>
              <button className="btn btn-primary">Siguiente</button>
            </Link>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col text-center">
            <h2>{props.nombre}</h2>
          </div>
        </div>
      </div>
    );
  } else if (props.actual === 6) {
    return (
      <div>
        <div className="row text-center">
          <div className="col-3 text-left">
            <Link to={"/paso" + (props.actual - 1)}>
              <button className="btn btn-primary">Anterior</button>
            </Link>
          </div>
          <div className="col">
            <span className="tituloPaso">Paso {props.actual} de 6</span>
          </div>
          <div className="col-3 text-right">
            <button className="btn btn-primary">Enviar solicitud (?)</button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col text-center">
            <h2>{props.nombre}</h2>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="row text-center">
          <div className="col-3 text-left">
            <Link to={"/paso" + (props.actual - 1)}>
              <button className="btn btn-primary">Anterior</button>
            </Link>
          </div>
          <div className="col">
            <span className="tituloPaso">Paso {props.actual} de 6</span>
          </div>
          <div className="col-3 text-right">
            <Link to={"/paso" + (props.actual + 1)}>
              <button className="btn btn-primary">Siguiente</button>
            </Link>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col text-center">
            <h2>{props.nombre}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default PasoTitle;
