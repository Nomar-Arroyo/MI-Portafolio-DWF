import React, { useState } from 'react';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLoginSuccess(email.split('@')[0]); // Extrae un nombre ficticio del email
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>&times;</button>
        
        <div className="auth-tabs">
          <button 
            className={`tab-btn ${isLoginTab ? 'active' : ''}`} 
            onClick={() => setIsLoginTab(true)}
          >
            Iniciar Sesión
          </button>
          <button 
            className={`tab-btn ${!isLoginTab ? 'active' : ''}`} 
            onClick={() => setIsLoginTab(false)}
          >
            Registrarse
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLoginTab && (
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" placeholder="Ej. John Doe" required />
            </div>
          )}
          
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="tu@cafe.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {isLoginTab ? 'Ingresar al Club' : 'Crear Cuenta Exclusiva'}
          </button>
        </form>
      </div>
    </div>
  );
}