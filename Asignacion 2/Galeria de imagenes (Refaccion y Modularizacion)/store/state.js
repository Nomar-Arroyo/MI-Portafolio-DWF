import { apiService } from '../services/api.js';

// Estado privado de la aplicación (Single Source of Truth)
let globalStorage = apiService.loadGlobalStorage();

export const state = {
    currentUser: null,
    memoryStore: { photos: [], albums: [], profilePic: null },
    currentViewPhotos: [],
    currentPhotoIndex: 0,
    activeTab: "library",
    activeInsideAlbum: null,

    /**
     * Inicializa o recupera la sesión de un usuario.
     * @param {string} username 
     */
    loginUser(username) {
        this.currentUser = username;
        if (!globalStorage[username]) {
            globalStorage[username] = { photos: [], albums: ["Favoritos"], profilePic: null };
        }
        this.memoryStore = globalStorage[username];
        // Sincroniza por si se creó el álbum "Favoritos" por defecto
        this.save();
    },

    /**
     * Limpia el estado al cerrar sesión.
     */
    logoutUser() {
        this.currentUser = null;
        this.memoryStore = { photos: [], albums: [], profilePic: null };
        this.currentViewPhotos = [];
        this.currentPhotoIndex = 0;
        this.activeTab = "library";
        this.activeInsideAlbum = null;
    },

    /**
     * Sincroniza los cambios de memoria hacia el LocalStorage de forma transparente.
     */
    save() {
        if (this.currentUser) {
            globalStorage[this.currentUser] = this.memoryStore;
            apiService.saveGlobalStorage(globalStorage);
        }
    }
};