<<<<<<< HEAD
// --- SISTEMA DE PERSISTENCIA (Base de Datos Local) ---
let globalStorage = {};
try {
    // Evitamos que datos corruptos previos rompan la página
    globalStorage = JSON.parse(localStorage.getItem('ultraGalleryData')) || {};
} catch (error) {
    console.warn("Base de datos local reiniciada por formato inválido.");
    globalStorage = {};
}

let currentUser = null;
let memoryStore = { photos: [], albums: ["Viajes", "Familia"], profilePic: null }; 

let currentViewPhotos = [];
let currentPhotoIndex = 0;
let activeTab = "library"; 
let activeInsideAlbum = null; 

// --- CONSTANTES DOM ---
const authSection = document.getElementById('auth-section');
const mainContent = document.getElementById('main-content');
const mainNav = document.getElementById('main-nav');
const toolbar = document.getElementById('toolbar');

const tabLibrary = document.getElementById('tab-library');
const tabMoments = document.getElementById('tab-moments');
const tabAlbums = document.getElementById('tab-albums');

const libraryView = document.getElementById('library-view');
const momentsView = document.getElementById('moments-view');
const albumsView = document.getElementById('albums-view');
const singleAlbumView = document.getElementById('single-album-view');
const libraryWrapper = document.getElementById('library-wrapper');
const albumsWrapper = document.getElementById('albums-wrapper');
const singleAlbumWrapper = document.getElementById('single-album-wrapper');

const albumDestination = document.getElementById('album-destination');
const viewTitle = document.getElementById('gallery-view-title');
const btnBackAlbums = document.getElementById('btn-back-albums');
const btnDeleteAlbum = document.getElementById('btn-delete-album');

// --- 🔐 LOGIN Y PERSISTENCIA ---
function attemptLogin() {
    const user = document.getElementById('username').value.trim();
    if (user !== "") {
        currentUser = user;
        document.getElementById('user-display-name').innerText = currentUser;
        
        if (!globalStorage[currentUser]) {
            globalStorage[currentUser] = { photos: [], albums: ["Favoritos"], profilePic: null };
        }
        memoryStore = globalStorage[currentUser];

        authSection.classList.add('hidden');
        mainNav.classList.remove('hidden');
        toolbar.classList.remove('hidden');
        mainContent.classList.remove('hidden');
        
        loadProfilePic();
        initApp();
    } else {
        alert("Por favor, ingresa un nombre de usuario para acceder a tu galería privada.");
    }
}

document.getElementById('login-btn').addEventListener('click', attemptLogin);

// Habilitar inicio de sesión pulsando "Enter"
document.getElementById('password').addEventListener('keypress', (e) => { if (e.key === 'Enter') attemptLogin(); });
document.getElementById('username').addEventListener('keypress', (e) => { if (e.key === 'Enter') attemptLogin(); });

function saveToDatabase() {
    if (currentUser) {
        globalStorage[currentUser] = memoryStore;
        localStorage.setItem('ultraGalleryData', JSON.stringify(globalStorage));
    }
}

// --- 📸 FOTO DE PERFIL ---
document.getElementById('user-display-btn').addEventListener('click', () => {
    document.getElementById('user-dropdown').classList.toggle('hidden');
});
function changeProfilePic() {
    document.getElementById('profile-pic-input').click();
    document.getElementById('user-dropdown').classList.add('hidden');
}

document.getElementById('profile-pic-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            memoryStore.profilePic = event.target.result;
            saveToDatabase();
            loadProfilePic();
=======
const authSection = document.getElementById('auth-section');
const gallerySection = document.getElementById('gallery-section');
const imageGrid = document.getElementById('image-grid');

// Simulación de Login
document.getElementById('login-btn').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    if(user) {
        document.getElementById('user-display').innerText = user;
        authSection.classList.add('hidden');
        gallerySection.classList.remove('hidden');
    }
});

// Manejo de subida de imágenes
document.getElementById('upload-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            renderImage(event.target.result);
>>>>>>> 4c97aa6fe719e6da53ab10abb7b55ba9d1bebf6d
        };
        reader.readAsDataURL(file);
    }
});

<<<<<<< HEAD
function loadProfilePic() {
    const avatarImg = document.getElementById('user-avatar');
    if (memoryStore.profilePic) {
        avatarImg.src = memoryStore.profilePic;
        avatarImg.classList.remove('hidden');
    } else {
        avatarImg.src = "";
        avatarImg.classList.add('hidden');
    }
}

function logoutApp() {
    currentUser = null;
    memoryStore = { photos: [], albums: [], profilePic: null };
    document.getElementById('user-dropdown').classList.add('hidden');
    
    mainNav.classList.add('hidden');
    toolbar.classList.add('hidden');
    mainContent.classList.add('hidden');
    authSection.classList.remove('hidden');
    
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    closeActionBar();
    closeModal();
}

function initApp() {
    updateAlbumDropdown();
    goToLibrary();
}

// --- 🔀 NAVEGACIÓN DE PESTAÑAS ---
tabLibrary.addEventListener('click', goToLibrary);
tabMoments.addEventListener('click', goToMoments);
tabAlbums.addEventListener('click', goToAlbumsMain);
btnBackAlbums.addEventListener('click', goToAlbumsMain);

function resetTabs() {
    tabLibrary.classList.remove('active');
    tabMoments.classList.remove('active');
    tabAlbums.classList.remove('active');
    libraryView.classList.add('hidden');
    momentsView.classList.add('hidden');
    albumsView.classList.add('hidden');
    singleAlbumView.classList.add('hidden');
    btnBackAlbums.classList.add('hidden');
    btnDeleteAlbum.classList.add('hidden');
}

function goToLibrary() {
    activeTab = "library"; activeInsideAlbum = null; resetTabs();
    tabLibrary.classList.add('active'); libraryView.classList.remove('hidden');
    viewTitle.innerText = "Library";
    renderLibrary();
}

function goToMoments() {
    activeTab = "moments"; activeInsideAlbum = null; resetTabs();
    tabMoments.classList.add('active'); momentsView.classList.remove('hidden');
    viewTitle.innerText = "Moments";
    renderMoments();
}

function goToAlbumsMain() {
    activeTab = "albums"; activeInsideAlbum = null; resetTabs();
    tabAlbums.classList.add('active'); albumsView.classList.remove('hidden');
    viewTitle.innerText = "Albums";
    renderAlbumsGrid();
}

// --- 📸 LÓGICA DE SUBIDA Y MOMENTOS ---
document.getElementById('upload-input').addEventListener('change', function(e) {
    const files = e.target.files;
    if (files.length > 0) {
        const momentKeywords = ['fiesta', 'cumple', 'amigos', 'party', 'birthday', 'viaje', 'especial', 'boda', 'graduacion'];

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dest = albumDestination.value;
                const fileNameLow = file.name.toLowerCase();
                const isSpecialMoment = momentKeywords.some(kw => fileNameLow.includes(kw));

                const newPhoto = {
                    id: Date.now() + Math.random(),
                    src: event.target.result,
                    date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
                    album: dest,
                    categoria: dest.toLowerCase(),
                    isMoment: isSpecialMoment
                };
                memoryStore.photos.push(newPhoto);
                saveToDatabase();
                refreshCurrentView();
            };
            reader.readAsDataURL(file);
        });
    }
});

function refreshCurrentView() {
    if (activeInsideAlbum) openAlbumContents(activeInsideAlbum);
    else if (activeTab === "library") renderLibrary();
    else if (activeTab === "moments") renderMoments();
    else renderAlbumsGrid();
}

// --- 📅 RENDERIZADO DE VISTAS ---
function renderLibrary() {
    libraryWrapper.innerHTML = "";
    currentViewPhotos = [...memoryStore.photos];
    if(currentViewPhotos.length === 0) libraryWrapper.innerHTML = `<p style="color:#aaa">No hay fotos en tu biblioteca.</p>`;
    currentViewPhotos.forEach(photo => libraryWrapper.appendChild(createImageDOM(photo)));
}

function renderMoments() {
    momentsView.innerHTML = "";
    currentViewPhotos = memoryStore.photos.filter(p => p.isMoment);
    if (currentViewPhotos.length === 0) {
        // CORRECCIÓN: Comillas dinámicas (backticks) para evitar Syntax Error
        momentsView.innerHTML = `<div class="date-section-header"><h3>No hay momentos especiales registrados. Nombra tus archivos "fiesta", "cumple" o "viaje" al subirlos.</h3></div>`;
        return;
    }

    const groups = {};
    currentViewPhotos.forEach(photo => {
        if (!groups[photo.date]) groups[photo.date] = [];
        groups[photo.date].push(photo);
    });
    
    Object.keys(groups).forEach(date => {
        const section = document.createElement('section');
        section.innerHTML = `
            <div class="date-section-header"><h3>Momento del: ${date}</h3></div>
            <div class="grid-inner" id="moments-grid-${date.replace(/[\s\/]/g, '')}"></div>
        `;
        momentsView.appendChild(section);
        const grid = document.getElementById(`moments-grid-${date.replace(/[\s\/]/g, '')}`);
        groups[date].forEach(photo => grid.appendChild(createImageDOM(photo)));
    });
}

function renderAlbumsGrid() {
    albumsWrapper.innerHTML = "";
    memoryStore.albums.forEach(albumName => {
        const count = memoryStore.photos.filter(p => p.album === albumName).length;
        const card = document.createElement('div');
        card.className = "album-card";
        card.innerHTML = `
            <svg class="folder-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
            </svg>
            <h4>${albumName}</h4>
            <span>${count} elementos</span>
        `;
        
        card.ondblclick = () => {
            card.classList.add('opening');
            setTimeout(() => openAlbumContents(albumName), 400); 
        };
        albumsWrapper.appendChild(card);
    });
}

function openAlbumContents(albumName) {
    activeInsideAlbum = albumName;
    viewTitle.innerText = `Álbum: ${albumName}`;
    btnBackAlbums.classList.remove('hidden');
    btnDeleteAlbum.classList.remove('hidden');
    
    albumsView.classList.add('hidden');
    singleAlbumView.classList.remove('hidden');
    
    singleAlbumWrapper.innerHTML = "";
    currentViewPhotos = memoryStore.photos.filter(p => p.album === albumName);
    if (currentViewPhotos.length === 0) {
        singleAlbumWrapper.innerHTML = `<p style="color:#aaa">Álbum vacío.</p>`;
        return;
    }
    currentViewPhotos.forEach(photo => singleAlbumWrapper.appendChild(createImageDOM(photo)));
}

// --- 🛑 ELIMINAR ÁLBUM COMPLETO ---
btnDeleteAlbum.addEventListener('click', () => {
    if (!activeInsideAlbum) return;
    if (confirm(`¿Estás seguro de eliminar el álbum "${activeInsideAlbum}" y todas sus fotos permanentemente?`)) {
        memoryStore.albums = memoryStore.albums.filter(a => a !== activeInsideAlbum);
        memoryStore.photos = memoryStore.photos.filter(p => p.album !== activeInsideAlbum);
        saveToDatabase();
        
        updateAlbumDropdown();
        goToAlbumsMain();
    }
});

// --- 🛠️ DOM IMAGEN Y SELECCIÓN ---
function createImageDOM(photo) {
    const container = document.createElement('div');
    container.className = 'img-container';
    container.setAttribute('data-id', photo.id);
    container.innerHTML = `<img src="${photo.src}" class="img-item" loading="lazy">`;
    
    container.onclick = () => {
        currentPhotoIndex = currentViewPhotos.findIndex(p => p.id === photo.id);
        document.querySelectorAll('.img-container').forEach(el => el.classList.remove('selected'));
        container.classList.add('selected');
        
        document.getElementById('action-bar').classList.remove('hidden');
        openModal(photo.src);
    };
    return container;
}

// --- 🖼️ VISUALIZADOR MODAL INTELIGENTE Y MAXIMIZADO ---
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

function openModal(src) {
    let currentImageSrc = src; 
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    
    modalImg.src = src;
    
    // ACTUALIZACIÓN DEL CONTADOR AL ABRIR
    const counter = document.getElementById('modal-counter');
    if(counter && currentViewPhotos.length > 0) {
        counter.innerText = `${currentPhotoIndex + 1} / ${currentViewPhotos.length}`;
    }
    
    modal.classList.remove('hidden'); 
    modal.style.display = 'flex';
    document.getElementById('action-bar').classList.remove('hidden');
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('show');
    
    // AÑADE ESTA LÍNEA PARA OCULTAR LA BARRA
    document.getElementById('action-bar').classList.add('hidden');
    
    setTimeout(() => {
        modal.style.display = 'none';
        // CORRECCIÓN: Reincorporamos la clase hidden tras ocultar el modal
        modal.classList.add('hidden'); 
    }, 400);
}

// NAVEGACIÓN FLECHAS
function navigateModal(direction, event) {
    if (event) event.stopPropagation();
    if (currentViewPhotos.length === 0) return;
    
    currentPhotoIndex += direction;
    if(currentPhotoIndex < 0) currentPhotoIndex = currentViewPhotos.length - 1;
    if(currentPhotoIndex >= currentViewPhotos.length) currentPhotoIndex = 0;
    
    const nextPhoto = currentViewPhotos[currentPhotoIndex];
    document.querySelectorAll('.img-container').forEach(el => el.classList.remove('selected'));
    const newContainer = document.querySelector(`.img-container[data-id="${nextPhoto.id}"]`);
    if(newContainer) newContainer.classList.add('selected');

    modalImg.src = nextPhoto.src;

    // ACTUALIZACIÓN DEL CONTADOR AL NAVEGAR
    const counter = document.getElementById('modal-counter');
    if(counter) {
        counter.innerText = `${currentPhotoIndex + 1} / ${currentViewPhotos.length}`;
    }
}

// NAVEGACIÓN TECLADO PREVENIDA DE SCROLL 
document.addEventListener('keydown', (e) => {
    const isModalOpen = modal.style.display === 'flex' || !modal.classList.contains('hidden');

    if (isModalOpen) {
        if (e.key === 'ArrowRight') {
            e.preventDefault(); 
            navigateModal(1, e);
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault(); 
            navigateModal(-1, e);
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
        }
    }
});

// --- 💾 MENÚ FLOTANTE Y ACCIONES ---
function closeActionBar() {
    document.getElementById('action-bar').classList.add('hidden');
    document.querySelectorAll('.img-container').forEach(el => el.classList.remove('selected'));
    document.getElementById('share-dropdown').classList.add('hidden');
}

function toggleShareMenu() {
    document.getElementById('share-dropdown').classList.toggle('hidden');
}

function shareTo(platform) {
    alert(`Compartiendo imagen en ${platform}...`);
    document.getElementById('share-dropdown').classList.add('hidden');
}

document.getElementById('btn-create-album').addEventListener('click', () => {
    const name = prompt("Nombre del nuevo álbum:");
    if (name && name.trim() !== "" && !memoryStore.albums.includes(name.trim())) {
        memoryStore.albums.push(name.trim());
        saveToDatabase();
        updateAlbumDropdown();
        if(activeTab === "albums" && !activeInsideAlbum) renderAlbumsGrid();
    }
});

function addSelectedToAlbum() {
    const selectedPhoto = currentViewPhotos[currentPhotoIndex];
    const name = prompt("Escribe el nombre del álbum al que deseas añadirla:\n\nDisponibles: " + memoryStore.albums.join(', '));
    if (name && memoryStore.albums.includes(name.trim())) {
        const photoInDB = memoryStore.photos.find(p => p.id === selectedPhoto.id);
        if(photoInDB) {
            photoInDB.album = name.trim();
            saveToDatabase();
            alert(`Foto añadida al álbum ${name.trim()}`);
            refreshCurrentView();
        }
    } else if (name) {
        alert("El álbum no existe. Créalo primero.");
    }
}

function updateAlbumDropdown() {
    albumDestination.innerHTML = '<option value="Library">Subir a Biblioteca</option>';
    memoryStore.albums.forEach(album => {
        const opt = document.createElement('option');
        opt.value = album;
        opt.innerText = `Subir a Álbum: ${album}`;
        albumDestination.appendChild(opt);
    });
}

function downloadCurrentImage() {
    if (currentViewPhotos.length === 0) return;
    const link = document.createElement('a');
    link.href = currentViewPhotos[currentPhotoIndex].src;
    link.download = 'mi-foto-premium.png';
    link.click();
}

document.getElementById('delete-btn').onclick = () => {
    if (currentViewPhotos.length === 0) return;
    if (confirm("¿Estás seguro de eliminar esta foto definitivamente?")) {
        const idToDelete = currentViewPhotos[currentPhotoIndex].id;
        memoryStore.photos = memoryStore.photos.filter(p => p.id !== idToDelete);
        saveToDatabase();
        closeActionBar();
        closeModal();
        refreshCurrentView();
    }
};
=======
function renderImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'img-item';
    
    // Opción de descarga al hacer click
    img.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = src;
        link.download = 'mi-galeria.png';
        link.click();
    });
    
    imageGrid.appendChild(img);
}
>>>>>>> 4c97aa6fe719e6da53ab10abb7b55ba9d1bebf6d
