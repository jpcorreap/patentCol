import React from "react";

const Login = () => {
  return (
    <div className="Login">
      <div className="container" id="menuLogin">
        <div className="container">
          <form action="/login" method="post">
            <div className="form-group">
              <div className="row">
                <label>Usuario:</label>
                <input type="text" className="form-control" name="username" />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <label>Contraseña::</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-warning" >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
