import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { isEmail } from "validator";

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      "Ingrese un correo electrónico válido."
    );
  }
  return ("")
};

const validLength = (value, isUsername) => {
  if (value.length < 6 || value.length > 20) {
    if (isUsername) {
      return ("El nombre de usuario debe tener entre 6 y 20 caracteres.");
    } else {
      return ("La contraseña debe tener entre 6 y 20 caracteres.");
    }
  }
};

const Register2 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTester, setIsTester] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    if (username) {
      const error = validLength(username, true);
      if (!error) {
        setUsernameError("");
      }
    } else {
      setUsernameError("");
    }
  };
  const onBlurUsername = () => {
    if (username) {
      const error = validLength(username, true);
      setUsernameError(error);
    } else {
      setUsernameError("");
    }
  }

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email) {
      const error = validEmail(email);
      if (!error) {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  };

  const onBlurEmail = () => {
    if (email) {
      const error = validEmail(email);
      setEmailError(error);
    } else {
      setEmailError("");
    }
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password) {
      const error = validLength(password, false);
      if (!error) {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  };
  const onBlurPassword = () => {
    if (password) {
      const error = validLength(password, false);
      setPasswordError(error);
    } else {
      setPasswordError("");
    }
  }

  const onChangeIsTester = (e) => {
    setIsTester(e.target.checked);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    AuthService.register(username, email, password, isTester).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className='gradient-background'>
      <div className="box">
        <h2>Feel<span style={{ color: 'hsl(218, 81%, 75%)' }}>UX</span></h2>
        {!successful && (
          <>
            <form action="" onSubmit={handleRegister}>
              <div className="inputBox">
                <input type="text" onChange={onChangeUsername} onBlur={onBlurUsername} required />
                <label>Usuario</label>
              </div>
              {usernameError && (
                <div className="alert alert-danger" role="alert">
                  {usernameError}
                </div>
              )}
              <div className="inputBox">
                <input type="text" onChange={onChangeEmail} onBlur={onBlurEmail} required />
                <label>Email</label>
              </div>
              {emailError && (
                <div className="alert alert-danger" role="alert">
                  {emailError}
                </div>
              )}
              <div className="inputBox">
                <input type="password" onChange={onChangePassword} onBlur={onBlurPassword} required />
                <label>Contraseña</label>
              </div>
              {passwordError && (
                <div className="alert alert-danger" role="alert">
                  {passwordError}
                </div>
              )}
              <div className="inputBoxCheckbox">
                <input type="checkbox" onChange={onChangeIsTester} />
                <label>Quiero registrarme como Tester</label>
              </div>
              <div className="button-container">
                <input type="submit" value="Registrarse" />
              </div>
            </form>
            <div className='button-container'>
              <p>¿Ya tienes una cuenta? <a href="/login"> Iniciar Sesión</a></p>
            </div>
          </>
        )}
        {message && (
          <>
            <div className={successful ? "inputBoxConfirmation" : "alert alert-danger"}>
              {message}
              {successful && (
                <a href="/login"> Iniciar Sesión</a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register2;
