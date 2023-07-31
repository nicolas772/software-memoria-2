import React from 'react';


const Login2 = () => {
  return (
    <div className="box">
      <h2>Feel UX</h2>
      <form action="">
        <div className="inputBox">
          <input type="text" name="" required />
          <label>Usuario</label>
        </div>
        <div className="inputBox">
          <input type="password" name="" required />
          <label>Contraseña</label>
        </div>
        <div className='button-container'>
            <input type="submit" value="Iniciar Sesión" />
        </div>
      </form>
      <div className='button-container'>
        <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
      </div>
    </div>
  );
};

export default Login2;
