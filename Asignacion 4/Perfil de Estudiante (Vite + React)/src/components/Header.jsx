import React from 'react';
import { Link } from 'react-router-dom';

function Header({ setIsAuthenticated }) {
  return (
    <header className="header">
      <div className="logo">Estudiante Pro</div>
      <nav>
        <Link to="/perfil">Mi Perfil</Link>
        <Link to="/proyectos">Proyectos y Habilidades</Link>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="btn-logout"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
}

export default Header;