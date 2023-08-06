import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { isEmail } from "validator";

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      "Este no es un email válido."
    );
  }
  return ("")
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        El nombre de usuario debe tener entre 3 y 20 caracteres.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        La contraseña debe tener entre 6 y 40 caracteres.
      </div>
    );
  }
};

const Register2 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isTester, setIsTester] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

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
  };

  const onChangePasswordConfirm = (e) => {
    const passwordConfirm = e.target.value;
    setPasswordConfirm(passwordConfirm);
  };

  const onChangeIsTester = (e) => {
    setIsTester(e.target.checked);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(passwordConfirm)
    console.log(isTester)
    /*AuthService.register(username, email, password, isTester).then(
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
    );*/
  };

  return (
    <div className='gradient-background'>
      <div className="box">
        <h2>Feel<span style={{ color: 'hsl(218, 81%, 75%)' }}>UX</span></h2>
        <form action="" onSubmit={handleRegister}>
          <div className="inputBox">
            <input type="text" onChange={onChangeUsername} required />
            <label>Usuario</label>
          </div>
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
            <input type="password" onChange={onChangePassword} required />
            <label>Contraseña</label>
          </div>
          <div className="inputBox">
            <input type="password" onChange={onChangePasswordConfirm} required />
            <label>Confirme Contraseña</label>
          </div>
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
      </div>
    </div>
  );
};

export default Register2;
