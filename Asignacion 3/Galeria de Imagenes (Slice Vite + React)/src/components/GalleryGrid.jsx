// src/components/GalleryGrid.jsx
import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext.jsx';

export function GalleryGrid() {
    const { 
        activeTab, 
        memoryStore, 
        saveMemory, 
        activeInsideAlbum, 
        setActiveInsideAlbum,
        setCurrentViewPhotos,
        setCurrentPhotoIndex 
    } = useGallery();

    const [newAlbumName, setNewAlbumName] = useState('');

    // --- ACCIONES DE SUBIDA Y GESTIÓN ---
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const newPhoto = {
                id: 'img_' + Date.now(),
                src: event.target.result,
                name: file.name,
                date: new Date().toLocaleDateString(),
                album: activeInsideAlbum || 'Library'
            };

            const updatedPhotos = [newPhoto, ...memoryStore.photos];
            saveMemory({ ...memoryStore, photos: updatedPhotos });
        };
        reader.readAsDataURL(file);
    };

    const handleCreateAlbum = (e) => {
        e.preventDefault();
        if (!newAlbumName.trim()) return;
        
        if (memoryStore.albums.includes(newAlbumName.trim())) {
            alert("El álbum ya existe.");
            return;
        }

        const updatedAlbums = [...memoryStore.albums, newAlbumName.trim()];
        saveMemory({ ...memoryStore, albums: updatedAlbums });
        setNewAlbumName('');
    };

    const openLightbox = (photosArray, index) => {
        setCurrentViewPhotos(photosArray);
        setCurrentPhotoIndex(index);
    };

    // --- FILTRADO DE CONTENIDO ---
    const allPhotos = memoryStore.photos || [];
    const displayedPhotos = activeInsideAlbum 
        ? allPhotos.filter(p => p.album === activeInsideAlbum)
        : allPhotos;

    return (
        <section className="main-content">
            {/* Toolbar superior reactivo */}
            <div className="toolbar glass-card">
                <h2 className="view-title">
                    {activeTab === 'library' && "Mi Biblioteca"}
                    {activeTab === 'albums' && (activeInsideAlbum ? `Álbum: ${activeInsideAlbum}` : "Mis Álbumes")}
                </h2>
                
                <div className="toolbar-actions">
                    {activeTab === 'albums' && !activeInsideAlbum && (
                        <form onSubmit={handleCreateAlbum} className="album-form">
                            <input 
                                type="text" 
                                placeholder="Nuevo Álbum..." 
                                value={newAlbumName}
                                onChange={(e) => setNewAlbumName(e.target.value)}
                            />
                            <button type="submit" className="btn-primary">+</button>
                        </form>
                    )}
                    
                    {(activeTab === 'library' || activeInsideAlbum) && (
                        <label className="btn-primary file-label">
                            Subir Imagen
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                        </label>
                    )}

                    {activeInsideAlbum && (
                        <button className="btn-secondary" onClick={() => setActiveInsideAlbum(null)}>
                            ← Volver
                        </button>
                    )}
                </div>
            </div>

            {/* Renderizado de Grillas */}
            {activeTab === 'albums' && !activeInsideAlbum ? (
                // Vista de Carpetas de Álbumes
                <div className="grid-container">
                    {memoryStore.albums.map((album, idx) => {
                        const count = allPhotos.filter(p => p.album === album).length;
                        return (
                            <div 
                                key={idx} 
                                className="glass-card folder-card"
                                onClick={() => setActiveInsideAlbum(album)}
                            >
                                <div className="folder-icon">📁</div>
                                <h3>{album}</h3>
                                <p>{count} elementos</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // Vista de Tarjetas de Fotos (Biblioteca o Álbum por dentro)
                <div className="grid-container">
                    {displayedPhotos.length === 0 ? (
                        <p className="empty-message">No hay imágenes en esta sección todavía.</p>
                    ) : (
                        displayedPhotos.map((photo, index) => (
                            <div 
                                key={photo.id} 
                                className="glass-card photo-card"
                                onClick={() => openLightbox(displayedPhotos, index)}
                            >
                                <img src={photo.src} alt={photo.name} />
                                <div className="photo-info">
                                    <h4>{photo.name}</h4>
                                    <span>{photo.date}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </section>
    );
}