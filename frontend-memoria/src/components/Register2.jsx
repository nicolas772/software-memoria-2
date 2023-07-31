import React from 'react';


const Register2 = () => {
  return (
    <div className="box">
      <h2>Feel UX</h2>
      <form action="">
        <div className="inputBox">
          <input type="text" name="" required />
          <label>Usuario</label>
        </div>
        <div className="inputBox">
          <input type="text" name="" required />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input type="password" name="" required />
          <label>Contraseña</label>
        </div>
        <div className="inputBox">
          <input type="password" name="" required />
          <label>Confirme Contraseña</label>
        </div>
        <div className="button-container">
          <input type="submit" value="Registrarse" />
        </div>
      </form>
      <div className='button-container'>
        <p>¿Ya tienes una cuenta? <a href="/login"> Iniciar Sesión</a></p>
      </div>
    </div>
  );
};

export default Register2;
