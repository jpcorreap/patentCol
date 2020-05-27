import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Busqueda from "./Busqueda.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Resultados from "./Resultados.js";
import Pasos from "./Pasos.js";

function Rutas(props) {
  const [query, setQuery] = useState({});

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/search">
          <Busqueda seteadorDeConsultas={(objeto) => setQuery(objeto)} />
        </Route>

        <Resultados query={query} />

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
