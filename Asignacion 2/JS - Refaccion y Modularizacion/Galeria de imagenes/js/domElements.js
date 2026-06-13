// ==========================================
// CENTRALIZACIÓN DE ELEMENTOS DEL DOM
// ==========================================
export const dom = {
    loginScreen: document.getElementById('login-screen'),
    appScreen: document.getElementById('app-screen'),
    loginForm: document.getElementById('login-form'),
    usernameInput: document.getElementById('username'),
    logoutBtn: document.getElementById('logout-btn'),
    welcomeMsg: document.getElementById('welcome-msg'),
    profileUpload: document.getElementById('profile-upload'),
    profileImg: document.getElementById('profile-img'),
    
    // Selectores corregidos y alineados con el HTML:
    albumsList: document.getElementById('select-album'), 
    albumForm: document.getElementById('album-form'),
    newAlbumName: document.getElementById('new-album-name'),
    
    uploadForm: document.getElementById('upload-form'),
    imageInput: document.getElementById('image-input'),
    selectAlbum: document.getElementById('select-album'),
    isMomentCheck: document.getElementById('is-moment-check') || { checked: false }, // En caso de que no uses el checkbox de momentos en la UI, evita que explote
    
    galleryGrid: document.getElementById('gallery-grid'),
    momentsGrid: document.getElementById('moments-grid'),
    currentAlbumTitle: document.getElementById('select-album'),
    
    imageModal: document.getElementById('image-modal'),
    modalImg: document.getElementById('modal-img'),
    closeModalBtn: document.getElementById('close-modal'),
    modalDelete: document.getElementById('modal-delete'),
    modalShare: document.getElementById('modal-share'),
    modalDownload: document.getElementById('modal-download')
};