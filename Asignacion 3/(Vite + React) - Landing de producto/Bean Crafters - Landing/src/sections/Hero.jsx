import React from 'react';
import './Hero.css';

export default function Hero({ onOpenAuth, user }) {
  return (
    <header id="hero" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">Experiencia Sensorial Suprema</span>
        <h1 className="hero-title">
          Café Premium Tostado Arte para Auténticos Conocedores
        </h1>
        <p className="hero-description">
          Lotes exclusivos y perfiles de tueste a la medida de tu paladar o industria gastronómica. Únete al club selecto.
        </p>
        <div className="hero-cta-group">
          <a href="#subscriptions" className="cta-primary">
            {user ? "Ver Mis Beneficios" : "Unirse a la Suscripción"}
          </a>
          <a href="#catalog" className="cta-secondary">Explorar Catálogo Regular</a>
        </div>
      </div>
    </header>
  );
}