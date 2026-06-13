import React from 'react';
import './Navbar.jsx'; // Vinculación limpia de estilos
import './Navbar.css';

export default function Navbar({ cartCount, user, onOpenCart, onOpenAuth, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#hero" className="logo">
          Bean<span>Crafters</span>
        </a>
        
        <ul className="nav-links">
          <li><a href="#subscriptions">Suscripciones</a></li>
          <li><a href="#catalog">Catálogo Regular</a></li>
        </ul>

        <div className="nav-actions">
          <button className="cart-icon-btn" onClick={onOpenCart}>
            🛒 <span className="cart-badge">{cartCount}</span>
          </button>

          {user ? (
            <div className="user-profile">
              <span className="user-name">Hola, {user}</span>
              <button className="logout-btn" onClick={onLogout}>Salir</button>
            </div>
          ) : (
            <button className="login-trigger-btn" onClick={onOpenAuth}>
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}