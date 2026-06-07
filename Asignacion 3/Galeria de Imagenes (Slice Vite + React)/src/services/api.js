// src/services/api.js
const STORAGE_KEY = 'ultraGalleryData';

export const apiService = {
    /**
     * Obtiene todos los datos almacenados en LocalStorage.
     * @returns {Object} Datos globales indexados por usuario.
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
     * Guarda el estado actual en el localStorage.
     * @param {Object} globalStorageData 
     */
    saveGlobalStorage(globalStorageData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(globalStorageData));
    }
};