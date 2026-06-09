// src/context/GalleryContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { apiService } from '../services/api.js';

// 👑 ¡CRUCIAL! Añadido el 'export' para que App.jsx pueda leerlo sin dar undefined
export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
    // Carga inicial del Storage global
    const [globalStorage, setGlobalStorage] = useState(() => apiService.loadGlobalStorage());
    
    // Estados principales de la aplicación
    const [currentUser, setCurrentUser] = useState(null);
    const [memoryStore, setMemoryStore] = useState({ photos: [], albums: [], profilePic: null });
    const [currentViewPhotos, setCurrentViewPhotos] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("library");
    const [activeInsideAlbum, setActiveInsideAlbum] = useState(null);

    // Estados reactivos para controlar los modales del slice de interfaz
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isActionBarOpen, setIsActionBarOpen] = useState(false);

    const loginUser = (username) => {
        setCurrentUser(username);
        const updatedStorage = { ...globalStorage };
        if (!updatedStorage[username]) {
            updatedStorage[username] = { photos: [], albums: ["Favoritos"], profilePic: null };
        }
        setMemoryStore(updatedStorage[username]);
        setGlobalStorage(updatedStorage);
        apiService.saveGlobalStorage(updatedStorage);
    };

    const logoutUser = () => {
        setCurrentUser(null);
        setMemoryStore({ photos: [], albums: [], profilePic: null });
        setCurrentViewPhotos([]);
        setCurrentPhotoIndex(0);
        setActiveTab("library");
        setActiveInsideAlbum(null);
        setIsModalOpen(false);
        setIsActionBarOpen(false);
    };

    const saveMemory = (updatedStore) => {
        if (currentUser) {
            setMemoryStore(updatedStore);
            const updatedStorage = { ...globalStorage, [currentUser]: updatedStore };
            setGlobalStorage(updatedStorage);
            apiService.saveGlobalStorage(updatedStorage);
        }
    };

    // =========================================================================
    // LÓGICA COHESIVA PARA WINDOW / CONTROL DE MODALES
    // =========================================================================
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeActionBar = () => {
        setIsActionBarOpen(false);
    };

    const navigateModal = (direction, event) => {
        if (event && typeof event.stopPropagation === 'function') {
            event.stopPropagation(); 
        }
        if (currentViewPhotos.length === 0) return;

        setCurrentPhotoIndex((prevIndex) => {
            if (direction === 'next' || direction === 1 || direction === 'right') {
                return (prevIndex + 1) % currentViewPhotos.length;
            } else if (direction === 'prev' || direction === -1 || direction === 'left') {
                return (prevIndex - 1 + currentViewPhotos.length) % currentViewPhotos.length;
            }
            return prevIndex;
        });
    };

    return (
        <GalleryContext.Provider value={{
            currentUser,
            memoryStore,
            currentViewPhotos,
            currentPhotoIndex,
            activeTab,
            activeInsideAlbum,
            isModalOpen,
            isActionBarOpen,
            loginUser,
            logoutUser,
            saveMemory,
            setCurrentViewPhotos,
            setCurrentPhotoIndex,
            setActiveTab,
            setActiveInsideAlbum,
            setIsModalOpen,
            setIsActionBarOpen,
            closeModal,
            closeActionBar,
            navigateModal
        }}>
            {children}
        </GalleryContext.Provider>
    );
};

export const useGallery = () => {
    const context = useContext(GalleryContext);
    if (!context) {
        throw new Error("useGallery debe ser usado dentro de un GalleryProvider");
    }
    return context;
};