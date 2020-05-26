import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Busqueda from "./Busqueda.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Pasos from "./Pasos.js";
import Paso3PatentsView from "./Paso3_PatentsView.js";
import Paso3PatentScope from "./Paso3_PatentScope.js";
import Paso3GoogleUPatents from "./Paso3_GoogleUPatents.js";
import Paso3GoogleIPatents from "./Paso3_GoogleIPatents.js";
import Paso3NasaPatents from "./Paso3_NasaPatents.js";

function Rutas(props) {
  const [query, setQuery] = useState({});

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/search">
          <button
            className="btn btn-success"
            onClick={() => console.log(query)}>
            Imprimir query en la consola
          </button>
          <Busqueda seteadorDeConsultas={(objeto) => setQuery(objeto)} />
        </Route>

        <Route exact path="/results/patentsview">
          <Paso3PatentsView query={query} />
        </Route>

        <Route exact path="/results/patentscope">
          <Paso3PatentScope />
        </Route>

        <Route exact path="/results/googleutility">
          <Paso3GoogleUPatents />
        </Route>

        <Route exact path="/results/googleissued">
          <Paso3GoogleIPatents />
        </Route>

        <Route exact path="/results/nasa">
          <Paso3NasaPatents />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Pasos />
      </Switch>
    </div>
  );
}

export default Rutas;
