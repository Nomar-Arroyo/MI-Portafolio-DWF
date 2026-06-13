import { state, saveToLocalStorage, getFilteredPhotos } from './store.js';
import { dom } from './domElements.js';
import { createPhotoCardHTML, createAlbumItemHTML } from './components.js';

export function renderAll() {
    dom.welcomeMsg.textContent = `Hola, ${state.currentUser}`;
    dom.profileImg.src = state.profileImg;
    
    // 1. Limpiamos y renderizamos de forma nativa las opciones dentro del único select que maneja tu interfaz
    dom.selectAlbum.innerHTML = state.albums.map(al => {
        const selected = al === state.currentAlbum ? 'selected' : '';
        return `<option value="${al}" ${selected}>${al}</option>`;
    }).join('');

    // 2. Renderizar Fotos del álbum activo
    const filteredPhotos = getFilteredPhotos();
    dom.galleryGrid.innerHTML = filteredPhotos.map(p => createPhotoCardHTML(p)).join('');

    // 3. Renderizar Sección Inteligente de Momentos
    const momentPhotos = state.photos.filter(p => p.isMoment && p.user === state.currentUser);
    dom.momentsGrid.innerHTML = momentPhotos.map(p => createPhotoCardHTML(p)).join('');
}

export function openPhotoModal(id) {
    const photo = state.photos.find(p => p.id === id);
    if (!photo) return;

    state.currentPhotoId = id;
    dom.modalImg.src = photo.src;
    
    // 🌟 CORREGIDO: Usamos 'active' para activar las animaciones elásticas de tu style.css
    dom.imageModal.classList.add('active'); 
    dom.imageModal.classList.remove('hidden'); // Por seguridad, si el HTML tuviera la clase 'hidden'

    // Actualizar contador
    const currentPhotos = getFilteredPhotos();
    const currentIndex = currentPhotos.findIndex(p => p.id === id);
    const counterEl = document.getElementById('modal-counter');
    if (counterEl && currentIndex !== -1) {
        counterEl.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
    }
}

export const closeModalWindow = () => {
    // Removemos ambas clases para asegurar que el CSS Glassmorphism lo oculte por completo
    dom.imageModal.classList.remove('active');
    dom.imageModal.classList.add('hidden');
    state.currentPhotoId = null;
};

export const downloadImage = () => {
    const photo = state.photos.find(p => p.id === state.currentPhotoId);
    if (!photo) return;
    
    const a = document.createElement('a');
    a.href = photo.src;
    a.download = `imagen-${photo.id}.jpg`;
    a.click();
}

export function toggleDropdown(btn) {
    const dropdown = btn.nextElementSibling;
    const isVisible = dropdown.style.display === 'flex';
    document.querySelectorAll('.photo-dropdown').forEach(d => d.style.display = 'none');
    dropdown.style.display = isVisible ? 'none' : 'flex';
}