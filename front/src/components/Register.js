import React from "react";

const Register = () => {
  return (
    <div className="Register">
      <div className="container" id="menuRegister">
        <div className="container">
          <form action="/register" method="post">
            <div className="form-group">
              <div className="row">
                <label>Usuario:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <label>Contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <label>Confirmar contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordC"
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
