import React from "react";

const Login = () => {
  return (
    <div className="Login">
      <div className="container" id="menuLogin">
        <div className="container">
          <form action="auth/login" method="post">
            <div className="form-group">
              <div className="row">
                <label>Username:</label>
                <input type="text" className="form-control" name="username" />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
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
