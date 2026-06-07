const STORAGE_KEY = 'ultraGalleryData';

export const apiService = {
    /**
     * Obtiene todos los datos crudos almacenados en la base de datos local.
     * @returns {Object} Datos globales de los usuarios.
     */
    loadGlobalStorage() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (error) {
            console.warn("Base de datos local reiniciada por formato inválido.");
            return {};
        }
    },

    /**
     * Guarda el estado actual de la base de datos de vuelta en el localStorage.
     * @param {Object} globalStorageData 
     */
    saveGlobalStorage(globalStorageData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(globalStorageData));
    }
};