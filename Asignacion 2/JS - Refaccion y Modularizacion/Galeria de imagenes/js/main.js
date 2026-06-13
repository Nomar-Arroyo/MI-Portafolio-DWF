import { dom } from './domElements.js';
import { state, saveToLocalStorage, loadFromLocalStorage, getFilteredPhotos } from './store.js';
import { renderAll, openPhotoModal, closeModalWindow, downloadImage, toggleDropdown } from './handlers.js';

// ==========================================
// ORQUESTADOR DE LISTENERS PRINCIPALES
// ==========================================

// Formulario de Login
dom.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = dom.usernameInput.value.trim().toLowerCase();
    if (user) {
        loadFromLocalStorage(user);
        dom.loginScreen.classList.add('hidden');
        dom.appScreen.classList.remove('hidden');
        renderAll();
    }
});

// Botón Cerrar Sesión
dom.logoutBtn.addEventListener('click', () => {
    saveToLocalStorage();
    state.currentUser = null;
    dom.appScreen.classList.add('hidden');
    dom.loginScreen.classList.remove('hidden');
    dom.usernameInput.value = '';
});

// ==========================================
// GESTIÓN DE ÁLBUMES (CORREGIDO)
// ==========================================
dom.albumForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = dom.newAlbumName.value.trim();
    
    if (name && !state.albums.includes(name)) {
        state.albums.push(name);
        dom.newAlbumName.value = '';
        saveToLocalStorage();
        renderAll(); // Volver a renderizar actualizará las opciones del select
        
        // Seleccionar automáticamente el álbum recién creado
        dom.selectAlbum.value = name;
        state.currentAlbum = name;
        saveToLocalStorage();
        renderAll();
    }
});

// ==========================================
// ESCUCHADOR DE CARGA DE IMÁGENES (CORREGIDO)
// ==========================================
dom.imageInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const newPhoto = {
                id: Date.now() + Math.random(), 
                user: state.currentUser,
                src: event.target.result, 
                album: dom.selectAlbum.value, // 🌟 Captura el valor del select del formulario en tiempo real
                isMoment: dom.isMomentCheck.checked || false
            };
            
            state.photos.push(newPhoto);
            saveToLocalStorage();
            renderAll();
        };
        
        reader.readAsDataURL(file);
    });
    
    dom.imageInput.value = '';
});

// 🌟 NUEVO: Listener para cambiar de álbum activo al usar el menú desplegable
dom.selectAlbum.addEventListener('change', (e) => {
    state.currentAlbum = e.target.value;
    saveToLocalStorage();
    renderAll(); // Esto filtrará y mostrará solo las fotos correspondientes al álbum elegido
});

// Cambio de foto de perfil
dom.profileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        state.profileImg = event.target.result;
        saveToLocalStorage();
        renderAll();
    };
    reader.readAsDataURL(file);
});

// ==========================================
// DELEGACIÓN DE EVENTOS DINÁMICOS EN EL GRID
// ==========================================
document.body.addEventListener('click', (e) => {
    const action = e.target.getAttribute('data-action') || e.target.closest('[data-action]')?.getAttribute('data-action');
    
    if (!action) {
        // Cerrar dropdowns abiertos si se da clic fuera
        if (!e.target.classList.contains('photo-menu-trigger')) {
            document.querySelectorAll('.photo-dropdown').forEach(d => d.style.display = 'none');
        }
        return;
    }

    // Interceptar clics en los elementos del grid de fotos
    if (action === 'toggle-dropdown') {
        toggleDropdown(e.target);
    } else if (action === 'delete-photo') {
        const id = parseInt(e.target.getAttribute('data-id') || e.target.closest('[data-id]').getAttribute('data-id'));
        state.photos = state.photos.filter(p => p.id !== id);
        closeModalWindow();
        saveToLocalStorage();
        renderAll();
    } else if (action === 'share-photo') {
        const src = e.target.getAttribute('data-src') || e.target.closest('[data-src]').getAttribute('data-src');
        alert(`Link copiado al portapapeles: ${src}`);
    } else if (action === 'download-photo') {
        const src = e.target.getAttribute('data-src') || e.target.closest('[data-src]').getAttribute('data-src');
        downloadImage(src);
    } 
    
    // Interceptores de interacción en la barra lateral de álbumes
    else if (action === 'delete-album') {
        const albumName = e.target.getAttribute('data-album');
        state.albums = state.albums.filter(a => a !== albumName);
        if(state.currentAlbum === albumName) state.currentAlbum = 'General';
        state.photos.forEach(p => { if(p.album === albumName) p.album = 'General'; });
        saveToLocalStorage();
        renderAll();
    }
});

// Delegación de clic para cambiar de álbum o abrir el Lightbox
dom.albumsList.addEventListener('click', (e) => {
    const item = e.target.closest('.album-item');
    if (item && !e.target.classList.contains('delete-album-btn')) {
        state.currentAlbum = item.getAttribute('data-album');
        renderAll();
    }
});

dom.galleryGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.photo-card');
    if (card && !e.target.hasAttribute('data-action') && !e.target.closest('[data-action]')) {
        const id = parseInt(card.getAttribute('data-id'));
        openPhotoModal(id);
    }
});

dom.momentsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.photo-card');
    if (card && !e.target.hasAttribute('data-action') && !e.target.closest('[data-action]')) {
        const id = parseInt(card.getAttribute('data-id'));
        openPhotoModal(id);
    }
});

// Eventos fijos del Modal Lightbox
dom.closeModalBtn.addEventListener('click', closeModalWindow);

dom.imageModal.addEventListener('click', (e) => {
    if (e.target === dom.imageModal) {
        closeModalWindow();
        saveToLocalStorage();
        renderAll();
    }
});

dom.modalDelete.addEventListener('click', () => {
    if (state.currentPhotoId) {
        // Filtramos para eliminar la foto actual
        state.photos = state.photos.filter(p => p.id !== state.currentPhotoId);
        saveToLocalStorage();
        closeModalWindow(); // Cerramos el modal ya que la foto dejó de existir
        renderAll();        // Refrescamos la galería de fondo
    }
});

// Botón de Compartir dentro del Modal
dom.modalShare.addEventListener('click', () => {
    if (state.currentPhotoId) {
        const photo = state.photos.find(p => p.id === state.currentPhotoId);
        if (photo) {
            navigator.clipboard.writeText(photo.src).then(() => {
                alert("¡Enlace de la imagen copiado al portapapeles con éxito!");
            }).catch(() => {
                alert(`URL de la imagen: ${photo.src}`);
            });
        }
    }
});

// Botón de Descargar dentro del Modal
dom.modalDownload.addEventListener('click', () => {
    if (state.currentPhotoId) {
        // Usamos la función nativa que ya tienes importada de handlers.js
        downloadImage(); 
    }
});

// ==========================================
// CONTROL DE CIERRE Y ACCIONES DEL LIGHTBOX
// ==========================================

// 1. Cerrar haciendo clic en el botón "X"
dom.closeModalBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModalWindow();
});

// 2. Cerrar haciendo clic fuera de la imagen (en el fondo esmerilado)
dom.imageModal.addEventListener('click', (e) => {
    if (e.target === dom.imageModal) {
        closeModalWindow();
    }
});

// 3. Soporte para cerrar con la tecla 'Escape' y navegación mejorada
document.addEventListener('keydown', (event) => {
    // Si el modal NO está activo, no hacemos nada
    if (!dom.imageModal.classList.contains('active')) return;
    if (!state.currentPhotoId) return;
    
    const currentPhotos = getFilteredPhotos();
    if (currentPhotos.length === 0) return;
    
    const currentIndex = currentPhotos.findIndex(p => p.id === state.currentPhotoId);
    if (currentIndex === -1) return;

    if (event.key === 'Escape') {
        closeModalWindow();
    } else if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % currentPhotos.length;
        openPhotoModal(currentPhotos[nextIndex].id);
    } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
        openPhotoModal(currentPhotos[prevIndex].id);
    }
});
// ==========================================
// DELEGACIÓN DE EVENTOS PARA CAPTURAR CLICS (CORREGIDO)
// ==========================================
const gestionarClicsGaleria = (e) => {
    const card = e.target.closest('.photo-card');
    if (!card) return;

    const photoId = parseFloat(card.dataset.id);

    // CASO A: Si hace clic en el botón de los 3 puntos (⋮)
    if (e.target.matches('[data-action="toggle-dropdown"]') || e.target.classList.contains('photo-menu-trigger')) {
        e.stopPropagation();
        // Cerramos cualquier otro menú que esté abierto primero
        document.querySelectorAll('.photo-dropdown.active').forEach(d => d.classList.remove('active'));
        
        const dropdown = card.querySelector('.photo-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
        return;
    }

    // CASO B: Si hace clic en la opción de Eliminar dentro del menú
    const deleteBtn = e.target.closest('[data-action="delete-photo"]');
    if (deleteBtn) {
        e.stopPropagation();
        state.photos = state.photos.filter(p => p.id !== photoId);
        saveToLocalStorage();
        renderAll();
        return;
    }

    // CASO C: Si hace clic en cualquier otra parte de la tarjeta o en la imagen misma, abrimos el Lightbox
    if (e.target.tagName === 'IMG' || !e.target.closest('.photo-dropdown')) {
        // Cerramos menús flotantes abiertos al abrir el modal
        document.querySelectorAll('.photo-dropdown.active').forEach(d => d.classList.remove('active'));
        openPhotoModal(photoId);
    }
};

// Asignamos el escuchador a ambas cuadrículas dinámicas
dom.galleryGrid.addEventListener('click', gestionarClicsGaleria);
dom.momentsGrid.addEventListener('click', gestionarClicsGaleria);

// Cerrar menús desplegables si se hace clic en cualquier otra parte de la pantalla externa
document.addEventListener('click', () => {
    document.querySelectorAll('.photo-dropdown.active').forEach(d => d.classList.remove('active'));
});