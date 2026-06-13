// ==========================================
// RENDERIZADORES COMPONENTIZADOS EN JAVASCRIPT
// ==========================================

/**
 * Componente funcional encargado de renderizar una tarjeta de imagen (Card)
 * Recibe un objeto "photo" como Prop que contiene la información de la imagen
 */
export function createPhotoCardHTML(photo) {
    return `
        <div class="photo-card" data-id="${photo.id}">
            <img src="${photo.src}" alt="Imagen de galería">
            <button class="photo-menu-trigger" data-action="toggle-dropdown">⋮</button>
            <div class="photo-dropdown">
                <button data-action="delete-photo" data-id="${photo.id}">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="margin-right:5px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>Eliminar
                </button>
                <button data-action="share-photo" data-src="${photo.src}">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="margin-right:5px;"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>Compartir
                </button>
                <button data-action="download-photo" data-src="${photo.src}">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="margin-right:5px;"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>Descargar
                </button>
            </div>
        </div>
    `;
}

/**
 * Componente de lista para los álbumes laterales
 */
export function createAlbumItemHTML(albumName, currentAlbum) {
    const isGeneral = albumName === 'General';
    return `
        <li data-album="${albumName}" class="album-item">
            <span>📁 ${albumName}</span>
            ${!isGeneral ? `<span data-action="delete-album" data-album="${albumName}" class="delete-album-btn">✕</span>` : ''}
        </li>
    `;
}