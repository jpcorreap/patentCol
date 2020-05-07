import React from "react";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import ProgressBar from "./components/ProgressBar.js";
import Paso1 from "./components/Paso1.js";
import Paso2 from "./components/Paso2.js";
import Paso3 from "./components/Paso3.js";
import Paso4 from "./components/Paso4.js";
import Paso5 from "./components/Paso5.js";
import Paso6 from "./components/Paso6.js";
import { Route, Switch } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <br />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
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
        </Switch>

      </div>
    </div>
  );
}

export default App;