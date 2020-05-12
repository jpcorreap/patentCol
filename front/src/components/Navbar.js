import React from "react";
import bandera from "../Bandera Colombia.png";
import { Link, Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={bandera} alt="logo" width="50px" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent">
        {props.autenticado === false ? (
          <div>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <strong>Ingresar</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    <strong>Registrarse</strong>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <strong>{props.username}</strong>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/logout">
                      Cerrar sesión
                    </a>
                  </div>
                </li>
              <li className="nav-item">
                <Link to={"/solicitudes"} className="nav-link">
                  <strong>Solicitudes</strong>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
