import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import Rutas from "./components/Rutas.js";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("auth/getUser")
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
        <Navbar autenticado={true} username={user.username} />
      ) : (
        <Navbar autenticado={false} />
      )}
      <br />
      <br />
      <div className="container">
        {user ? (
          <Rutas autenticado={true} username={user.username} />
        ) : (
          <Rutas autenticado={false} />
        )}
      </div>
    </div>
  );
}

export default App;
