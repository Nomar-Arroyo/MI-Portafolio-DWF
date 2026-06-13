// ==========================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================
export let state = {
    currentUser: null,
    albums: ['General', 'Vacaciones', 'Familia'],
    currentAlbum: 'General',
    photos: [
        { id: 1, user: 'demo', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', album: 'Vacaciones', isMoment: true },
        { id: 2, user: 'demo', src: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b', album: 'General', isMoment: false }
    ],
    profileImg: 'https://via.placeholder.com/150',
    currentPhotoId: null
};

export function saveToLocalStorage() {
    if (state.currentUser) {
        localStorage.setItem(`gallery_state_${state.currentUser}`, JSON.stringify(state));
    }
}

export function loadFromLocalStorage(username) {
    const saved = localStorage.getItem(`gallery_state_${username}`);
    if (saved) {
        const data = JSON.parse(saved);
        // Copiamos las propiedades de manera segura al objeto state existente
        Object.assign(state, data);
    } else {
        state.currentUser = username;
        state.albums = ['General', 'Vacaciones', 'Familia'];
        state.currentAlbum = 'General';
        state.photos = [];
        state.profileImg = 'https://via.placeholder.com/150';
        state.currentPhotoId = null;
    }
}

export function getFilteredPhotos() {
    return state.photos.filter(p => p.album === state.currentAlbum && p.user === state.currentUser);
}