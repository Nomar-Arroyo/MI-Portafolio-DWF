import React from 'react';

function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí a futuro harás un fetch() a tu backend en Flask
    onLogin();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu perfil de estudiante</p>
        
        <div className="form-group">
          <label>Usuario / Correo</label>
          <input type="text" placeholder="ejemplo@correo.com" required />
        </div>
        
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" placeholder="********" required />
        </div>
        
        <button type="submit" className="btn-contacto">Entrar al Perfil</button>
      </form>
    </div>
  );
}

export default Login;