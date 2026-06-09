// src/components/Sidebar.jsx
import React from 'react';
import { useGallery } from '../context/GalleryContext.jsx';

export function Sidebar() {
    const { 
        currentUser, 
        logoutUser, 
        activeTab, 
        setActiveTab, 
        setActiveInsideAlbum,
        memoryStore 
    } = useGallery();

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setActiveInsideAlbum(null); // Resetea la vista interna de álbumes al cambiar de pestaña
    };

    return (
        <aside className="gallery-nav glass-card" id="main-nav">
            {/* Perfil de Usuario */}
            <div className="user-profile">
                <div className="profile-avatar-wrapper">
                    <img 
                        src={memoryStore.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                        alt="Avatar" 
                        className="profile-avatar"
                    />
                </div>
                <div className="user-info">
                    <span className="user-name">{currentUser}</span>
                    <span className="user-role">Plan Premium</span>
                </div>
            </div>

            {/* Enlaces de Navegación */}
            <div className="nav-links">
                <button 
                    className={`nav-btn ${activeTab === 'library' ? 'active' : ''}`}
                    onClick={() => handleTabChange('library')}
                >
                    <span>Biblioteca</span>
                </button>

                <button 
                    className={`nav-btn ${activeTab === 'albums' ? 'active' : ''}`}
                    onClick={() => handleTabChange('albums')}
                >
                    <span>Álbumes</span>
                </button>
            </div>

            {/* Botón de Cierre de Sesión */}
            <button className="logout-btn" onClick={logoutUser}>
                <span>Cerrar Sesión</span>
            </button>
        </aside>
    );
}