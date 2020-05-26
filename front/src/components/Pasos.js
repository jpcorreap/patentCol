import React from "react";
import { Route } from "react-router-dom";
import ProgressBar from "./ProgressBar.js";
import Paso1 from "./Paso1.js";
import Paso2 from "./Paso2.js";
import Paso3 from "./Paso3_PatentsView.js";
import Paso4 from "./Paso4.js";
import Paso5 from "./Paso5.js";
import Paso6 from "./Paso6.js";

function Pasos(props) {
  return (
    <div>
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
    </div>
  );
}

export default Pasos;
