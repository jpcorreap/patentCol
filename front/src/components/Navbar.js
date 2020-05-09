import React from 'react';
import bandera from "../Bandera Colombia.png";
import { Link } from "react-router-dom";

function Navbar(props) {


    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/"><img src={bandera} alt="logo" width="50px" /></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      
      {props.autenticado === false ? (
        <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              <strong>Login</strong>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              <strong>register</strong>
            </Link>
          </li>
        </ul>
      </div>
      ):(
        <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              <strong>PatentCol</strong>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              <strong>Mis solicitudes</strong>
            </Link>
          </li>
        </ul>
      </div>
      )}
      
    </div>
  </nav>);
}


export default Navbar;