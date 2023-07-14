import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es requerido
      </div>
    )
  }
}

const Login = () => {
  let navigate = useNavigate()

  const form = useRef()
  const checkBtn = useRef()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    navigate("/register")
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        (response) => {
          if (response.roles.includes("ROLE_USER")) {
            navigate("/homeUser");
          } else {
            navigate("/homeTester");
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div class="gradient-background">
      <div className="login-container">
        <div className="col-md-6">
          <div className="left-content">
            <h1 style={{ color: "#435F7A" }}>Feel UX</h1>
            <h6>Feel UX te ayudará a realizar de manera sencilla tus pruebas de usabilidad, utilizando Inteligencia
              Artificial para el análisis de sentimiento de tus usuarios.
            </h6>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-container">
            <Form onSubmit={handleLogin} ref={form}>
              <div className="form-groups">
                <label htmlFor="username">Usuario</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Iniciar Sesión</span>
                </button>
              </div>

              <div className="form-group">
                <button className="btn btn-secondary btn-block" disabled={loading} onClick={handleRegister}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Registrarse</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login