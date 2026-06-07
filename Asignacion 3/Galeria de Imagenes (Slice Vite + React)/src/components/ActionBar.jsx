// src/components/ActionBar.jsx
import React from 'react';
import { useGallery } from '../context/GalleryContext.jsx';

export function ActionBar({ activePhoto, onClose }) {
    const { memoryStore, saveMemory } = useGallery();

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = activePhoto.src;
        link.download = activePhoto.name || 'gallery-download.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const deleteImage = () => {
        if (!window.confirm("¿Estás seguro de eliminar esta foto definitivamente?")) return;

        // Filtrar eliminando la foto activa mediante ID único
        const updatedPhotos = memoryStore.photos.filter(p => p.id !== activePhoto.id);
        
        saveMemory({
            ...memoryStore,
            photos: updatedPhotos
        });

        onClose(); // Cierra el visor tras eliminar el recurso
    };

    return (
        <div className="action-bar glass-card">
            {/* Botón Descargar */}
            <button onClick={downloadImage}>
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <h3>Descargar</h3>
            </button>

            <div className="divider" style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }}></div>

            {/* Botón Eliminar */}
            <button className="danger" onClick={deleteImage}>
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                <h3>Eliminar</h3>
            </button>
        </div>
    );
}