import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="container header-container">
        <div className="logo-area">
          <span className="logo-icon">🍳</span>
          <h1>¿Qué Cocino Hoy?</h1>
        </div>
        <p className="header-tagline">Tu asistente inteligente de cocina conectado a datos en tiempo real</p>
      </div>
    </header>
  );
};

export default Header;