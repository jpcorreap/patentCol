import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProgressBar from "./ProgressBar.js";
import Paso1 from "./Paso1.js";
import Paso2 from "./Paso2.js";
import Paso3 from "./Paso3.js";
import Paso4 from "./Paso4.js";
import Paso5 from "./Paso5.js";
import Paso6 from "./Paso6.js";

function Pasos(props) {
  return (
    <div>
    { props.autenticado === false ? (
      <div>
      <Switch>
        <Route exact path="/">
         <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
       <Route exact path="/register">
         <Register />
        </Route>
      </Switch>
      <br/>
      <br/>
      <br/>
      <div className="container">
            <h5 id="footer">
              ¡Inicia sesión para acceder a muchas más funcionalidades! Podrás
              guardar, crear, eliminar y visualizar tus actividades.
              <br />
            </h5>
          </div>
      </div>
    ):(<Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/paso1">
        <ProgressBar avance={1} />
        <Paso1 />
      </Route>

      <Route exact path="/paso2">
        <ProgressBar avance={2} />
        <Paso2 />
      </Route>

      <Route exact path="/paso3">
        <ProgressBar avance={3} />
        <Paso3 />
      </Route>

      <Route exact path="/paso4">
        <ProgressBar avance={4} />
        <Paso4 />
      </Route>

      <Route exact path="/paso5">
        <ProgressBar avance={5} />
        <Paso5 />
      </Route>

      <Route exact path="/paso6">
        <ProgressBar avance={6} />
        <Paso6 />
      </Route>
    </Switch>)}
    </div>
  );
}

export default Pasos;
