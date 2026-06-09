// src/components/ImageViewer.jsx
import React, { useEffect } from 'react';
import { useGallery } from '../context/GalleryContext.jsx';
import { ActionBar } from './ActionBar.jsx';

export function ImageViewer() {
    const { 
        currentViewPhotos, 
        currentPhotoIndex, 
        setCurrentPhotoIndex, 
        setCurrentViewPhotos 
    } = useGallery();

    // Si no hay fotos seleccionadas para mostrar en el visor, no renderiza nada
    if (!currentViewPhotos || currentViewPhotos.length === 0) return null;

    const activePhoto = currentViewPhotos[currentPhotoIndex];

    const navigateModal = (direction, e) => {
        if (e) e.stopPropagation();
        let nextIndex = currentPhotoIndex + direction;
        
        // Bucle infinito circular en la navegación
        if (nextIndex >= currentViewPhotos.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = currentViewPhotos.length - 1;
        
        setCurrentPhotoIndex(nextIndex);
    };

    const handleClose = () => {
        setCurrentViewPhotos([]); // Limpiar la cola de visualización cierra el modal automáticamente
    };

    // Soporte nativo para navegación por teclado (Flechas e Escape)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') navigateModal(1);
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPhotoIndex, currentViewPhotos]);

    return (
        <div className="modal" id="image-modal" onClick={handleClose}>
            {/* Flecha Izquierda */}
            <button className="nav-arrow left-arrow" onClick={(e) => navigateModal(-1, e)}>❮</button>
            
            {/* Contenedor central de la imagen */}
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={handleClose}>✕</button>
                <img src={activePhoto.src} alt={activePhoto.name} className="modal-image" />
            </div>

            {/* Flecha Derecha */}
            <button className="nav-arrow right-arrow" onClick={(e) => navigateModal(1, e)}>❯</button>

            {/* Inyección de la barra de acciones flotante vinculada al visor */}
            <ActionBar activePhoto={activePhoto} onClose={handleClose} />
        </div>
    );
}