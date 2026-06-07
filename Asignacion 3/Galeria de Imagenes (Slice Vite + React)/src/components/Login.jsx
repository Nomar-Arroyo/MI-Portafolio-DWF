// src/components/Login.jsx
import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext.jsx';

export function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const { loginUser } = useGallery();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usernameInput.trim()) {
            loginUser(usernameInput.trim());
        }
    };

    return (
        <section className="auth-overlay">
            <div className="glass-card login-window">
                <div className="login-content">
                    <h1>Inicia Sesión</h1>
                    <h2>Accede a tu galería privada</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Nombre de usuario" 
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                required 
                                autoFocus
                            />
                            <input 
                                type="password" 
                                placeholder="Contraseña (Opcional en demo)" 
                                disabled
                                style={{ cursor: 'not-allowed', opacity: 0.6 }}
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                            Entrar ahora
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}