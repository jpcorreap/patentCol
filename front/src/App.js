import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import ProgressBar from "./components/ProgressBar.js";
import Paso1 from "./components/Paso1.js";
import Paso2 from "./components/Paso2.js";
import Paso3 from "./components/Paso3.js";
import Paso4 from "./components/Paso4.js";
import Paso5 from "./components/Paso5.js";
import Paso6 from "./components/Paso6.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import { Route, Switch } from "react-router-dom";

import "./App.css";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/getUser")
      .then((res) => res.json())
      .then((user) => {
        if (user) {
          setUser(user);
        }
      });
  }, []);

  return (
    <div className="App">
      {user ? (     
      <div className="container">
        <Navbar autenticado={true} username={user.username}/>
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
    ) : (
      <div className="container">
        <Navbar autenticado={false} />
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
        <br />
          <br />
          <div className="container">
            <h5 id="footer">
              ¡Inicia sesión para acceder a muchas más funcionalidades! Podrás
              guardar, crear, eliminar y visualizar tus actividades.
              <br />
            </h5>
          </div>
      </div>
      )} 
    </div>
  );
}

export default App;