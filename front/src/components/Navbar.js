import React from "react";
import bandera from "../Bandera Colombia.png";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg ">
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
                    <strong>Login</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    <strong>Sing up</strong>
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
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <strong>{props.username}</strong>
                </button>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <button
                    className="dropdown-item"
                    onClick={() => window.location.replace("/auth/logout/")}>
                    Sing out
                  </button>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
