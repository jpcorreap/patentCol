import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProgressBar from "./ProgressBar.js";
import Paso1 from "./Paso1.js";
import Paso2 from "./Paso2.js";
import Paso3 from "./Paso3.js";
import Paso3_PatentScope from "./Paso3_PatentScope.js";
import Paso3_GoogleUPatents from "./Paso3_GoogleUPatents.js";
import Paso3_GoogleIPatents from "./Paso3_GoogleIPatents.js";
import Paso3_NasaPatents from "./Paso3_NasaPatents.js";
import Paso4 from "./Paso4.js";
import Paso5 from "./Paso5.js";
import Paso6 from "./Paso6.js";
import Solicitudes from "./Solicitudes.js";

function Pasos(props) {
  return (
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

        <Route exact path="/solicitudes">
          <Solicitudes />
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

        <Route exact path="/paso3_scope">
          <ProgressBar avance={3} />
          <Paso3_PatentScope />
        </Route>

        <Route exact path="/paso3_googleutility">
          <ProgressBar avance={3} />
          <Paso3_GoogleUPatents />
        </Route>

        <Route exact path="/paso3_googleissued">
          <ProgressBar avance={3} />
          <Paso3_GoogleIPatents />
        </Route>

        <Route exact path="/paso3_nasa">
          <ProgressBar avance={3} />
          <Paso3_NasaPatents />
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
          {props.username ? <Paso6 username={props.username} /> : <Paso6 />}
        </Route>
      </Switch>
    </div>
  );
}

export default Pasos;
