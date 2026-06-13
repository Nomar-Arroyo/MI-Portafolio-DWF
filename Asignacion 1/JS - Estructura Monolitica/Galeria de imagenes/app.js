// ==========================================
// ESTADO GLOBAL DE LA APLICACIÓN (MONOLITO)
// ==========================================
let state = {
    currentUser: null,
    albums: ['General', 'Vacaciones', 'Familia'],
    currentAlbum: 'General',
    photos: [
        { id: 1, user: 'demo', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', album: 'Vacaciones', isMoment: true },
        { id: 2, user: 'demo', src: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b', album: 'General', isMoment: false }
    ],
    profileImg: 'https://via.placeholder.com/150',
    currentPhotoId: null // Variable unificada para el estado de la foto activa en el modal
};

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const dom = {
    loginScreen: document.getElementById('login-screen'),
    appScreen: document.getElementById('app-screen'),
    loginForm: document.getElementById('login-form'),
    usernameInput: document.getElementById('username'),
    logoutBtn: document.getElementById('logout-btn'),
    welcomeMsg: document.getElementById('welcome-msg'),
    profileUpload: document.getElementById('profile-upload'),
    profileImg: document.getElementById('profile-img'),
    albumsList: document.getElementById('albums-list'),
    albumForm: document.getElementById('album-form'),
    newAlbumName: document.getElementById('new-album-name'),
    uploadForm: document.getElementById('upload-form'),
    imageInput: document.getElementById('image-input'),
    selectAlbum: document.getElementById('select-album'),
    isMomentCheck: document.getElementById('is-moment'),
    galleryGrid: document.getElementById('gallery-grid'),
    momentsGrid: document.getElementById('moments-grid'),
    currentAlbumTitle: document.getElementById('current-album-title'),
    imageModal: document.getElementById('image-modal'),
    modalImg: document.getElementById('modal-img'),
    closeModalBtn: document.getElementById('close-modal'), // Sincronizado con el ID correcto
    modalDelete: document.getElementById('modal-delete'),
    modalShare: document.getElementById('modal-share'),
    modalDownload: document.getElementById('modal-download')
};

// ==========================================
// PERSISTENCIA LOCAL STORAGE
// ==========================================
function saveToLocalStorage() {
    if (state.currentUser) {
        localStorage.setItem(`gallery_state_${state.currentUser}`, JSON.stringify(state));
    }
}

function loadFromLocalStorage(username) {
    const saved = localStorage.getItem(`gallery_state_${username}`);
    if (saved) {
        state = JSON.parse(saved);
    } else {
        state.currentUser = username;
        state.albums = ['General', 'Vacaciones', 'Familia'];
        state.photos = [];
        state.profileImg = 'https://via.placeholder.com/150';
        state.currentPhotoId = null;
    }
}

// ==========================================
// FUNCIONES DE FILTRADO UTILITARIAS
// ==========================================
function getFilteredPhotos() {
    return state.photos.filter(p => p.album === state.currentAlbum && p.user === state.currentUser);
}

// ==========================================
// RENDERIZADO DENTRO DEL DOM (INTERFAZ)
// ==========================================
function renderAll() {
    dom.welcomeMsg.textContent = `Hola, ${state.currentUser}`;
    dom.profileImg.src = state.profileImg;
    dom.currentAlbumTitle.textContent = state.currentAlbum;

    // Renderizar selectores de álbumes
    dom.selectAlbum.innerHTML = state.albums.map(al => `<option value="${al}">${al}</option>`).join('');
    
    // Renderizar lista lateral de álbumes
    dom.albumsList.innerHTML = state.albums.map(al => `
        <li onclick="switchAlbum('${al}')">
            <span>📁 ${al}</span>
            ${al !== 'General' ? `<span onclick="event.stopPropagation(); deleteAlbum('${al}')" class="delete-album-btn">✕</span>` : ''}
        </li>
    `).join('');

    // Renderizar Fotos del álbum activo
    const filteredPhotos = getFilteredPhotos();
    dom.galleryGrid.innerHTML = filteredPhotos.map(p => createPhotoCardHTML(p)).join('');

    // Renderizar Sección Inteligente de Momentos (Filtra globalmente por usuario)
    const momentPhotos = state.photos.filter(p => p.isMoment && p.user === state.currentUser);
    dom.momentsGrid.innerHTML = momentPhotos.map(p => createPhotoCardHTML(p)).join('');
}

// Reemplazo de Emojis por Estructura SVG e inyección de descarga en el mini panel
function createPhotoCardHTML(photo) {
    return `
        <div class="photo-card" onclick="openPhotoModal(${photo.id})">
            <img src="${photo.src}" alt="Imagen de galería">
            <button class="photo-menu-trigger" onclick="event.stopPropagation(); toggleDropdown(this)">⋮</button>
            <div class="photo-dropdown">
                <button onclick="event.stopPropagation(); deletePhoto(${photo.id})">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="margin-right:5px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>Eliminar
                </button>
                <button onclick="event.stopPropagation(); sharePhoto('${photo.src}')">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="margin-right:5px;"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>Compartir
                </button>
                <button onclick="event.stopPropagation(); downloadImage('${photo.src}')">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="margin-right:5px;"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>Descargar
                </button>
            </div>
        </div>
    `;
}

// ==========================================
// FUNCIONES DE CONTROL DE EVENTOS (ACCIONES)
// ==========================================
window.toggleDropdown = function(btn) {
    const dropdown = btn.nextElementSibling;
    const isVisible = dropdown.style.display === 'flex';
    document.querySelectorAll('.photo-dropdown').forEach(d => d.style.display = 'none');
    dropdown.style.display = isVisible ? 'none' : 'flex';
};

document.addEventListener('click', () => {
    document.querySelectorAll('.photo-dropdown').forEach(d => d.style.display = 'none');
});

window.switchAlbum = function(albumName) {
    state.currentAlbum = albumName;
    renderAll();
};

window.deleteAlbum = function(albumName) {
    state.albums = state.albums.filter(a => a !== albumName);
    if(state.currentAlbum === albumName) state.currentAlbum = 'General';
    state.photos.forEach(p => { if(p.album === albumName) p.album = 'General'; });
    saveToLocalStorage();
    renderAll();
};

window.deletePhoto = function(id) {
    state.photos = state.photos.filter(p => p.id !== id);
    closeModalWindow();
    saveToLocalStorage();
    renderAll();
};

window.sharePhoto = function(src) {
    alert(`Link copiado al portapapeles: ${src}`);
};

window.openPhotoModal = function(id) {
    const photo = state.photos.find(p => p.id === id);
    if(photo) {
        state.currentPhotoId = id; // Asegura la actualización en el estado general
        dom.modalImg.src = photo.src;
        dom.imageModal.classList.remove('hidden');
    }
    const currentIndex = currentPhotos.findIndex(p => p.id === photoId);
    document.getElementById('modal-counter').textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
};

function closeModalWindow() {
    dom.imageModal.classList.add('hidden');
    state.currentPhotoId = null;
}

// ==========================================
// LISTENERS Y ENVÍOS DE FORMULARIOS
// ==========================================
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

dom.logoutBtn.addEventListener('click', () => {
    saveToLocalStorage();
    state.currentUser = null;
    dom.appScreen.classList.add('hidden');
    dom.loginScreen.classList.remove('hidden');
    dom.usernameInput.value = '';
});

dom.albumForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = dom.newAlbumName.value.trim();
    if(name && !state.albums.includes(name)) {
        state.albums.push(name);
        dom.newAlbumName.value = '';
        saveToLocalStorage();
        renderAll();
    }
});

dom.uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = dom.imageInput.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const newPhoto = {
            id: Date.now(),
            user: state.currentUser,
            src: event.target.result,
            album: dom.selectAlbum.value,
            isMoment: dom.isMomentCheck.checked
        };
        state.photos.push(newPhoto);
        dom.uploadForm.reset();
        saveToLocalStorage();
        renderAll();
    };
    reader.readAsDataURL(file);
});

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

dom.closeModalBtn.addEventListener('click', closeModalWindow);

dom.modalDelete.addEventListener('click', () => {
    if(state.currentPhotoId) window.deletePhoto(state.currentPhotoId);
});

dom.modalShare.addEventListener('click', () => {
    if(state.currentPhotoId) {
        const photo = state.photos.find(p => p.id === state.currentPhotoId);
        window.sharePhoto(photo.src);
    }
});

dom.modalDownload.addEventListener('click', () => {
    if(state.currentPhotoId) {
        const photo = state.photos.find(p => p.id === state.currentPhotoId);
        downloadImage(photo.src);
    }
});

// ==========================================
// SECCIÓN: NAVEGACIÓN POR TECLADO NATIVA (INTEGRADA)
// ==========================================
document.addEventListener('keydown', (event) => {
    if (!dom.imageModal || dom.imageModal.classList.contains('hidden')) return;
    if (!state.currentPhotoId) return;
    
    const currentPhotos = getFilteredPhotos();
    if (currentPhotos.length === 0) return;
    
    const currentIndex = currentPhotos.findIndex(p => p.id === state.currentPhotoId);
    if (currentIndex === -1) return;

    if (event.key === 'ArrowRight') {
        // Siguiente imagen con ciclo infinito
        const nextIndex = (currentIndex + 1) % currentPhotos.length;
        window.openPhotoModal(currentPhotos[nextIndex].id);
    } else if (event.key === 'ArrowLeft') {
        // Imagen anterior con ciclo infinito
        const prevIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
        window.openPhotoModal(currentPhotos[prevIndex].id);
    } else if (event.key === 'Escape') {
        // Cerrar modal con la tecla Esc
        closeModalWindow(); 
    }
});

// ==========================================
// SECCIÓN: FUNCIÓN UTILITARIA DE DESCARGA
// ==========================================
function downloadImage(photoSrc, photoName = 'galeria-imagen') {
    const downloadLink = document.createElement('a');
    downloadLink.href = photoSrc;
    downloadLink.download = `${photoName}-${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}