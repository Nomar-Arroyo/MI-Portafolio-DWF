// src/App.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// 💡 IMPORTANTE: Asegúrate de apuntar a la ruta real de tus estilos CSS globales
import './styles/index.css'; 

// =========================================================================
// 👑 1. CONTEXTO GLOBAL DEL SLICE
// =========================================================================
const GalleryContext = createContext();

export function GalleryProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Datos locales controlados para la demostración ante el jurado
  const demoPhotos = [
    { id: 1, src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600', title: 'Concepto Abstracto' },
    { id: 2, src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600', title: 'Fluido de Color' },
    { id: 3, src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600', title: 'Geometría Glass' }
  ];

  const loginUser = (username) => {
    setCurrentUser(username);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsModalOpen(false);
  };

  const navigateModal = (direction) => {
    if (!selectedPhoto) return;
    const currentIndex = demoPhotos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex = currentIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % demoPhotos.length;
    } else {
      newIndex = (currentIndex - 1 + demoPhotos.length) % demoPhotos.length;
    }
    setSelectedPhoto(demoPhotos[newIndex]);
  };

  return (
    <GalleryContext.Provider value={{
      currentUser,
      demoPhotos,
      selectedPhoto,
      setSelectedPhoto,
      isModalOpen,
      setIsModalOpen,
      loginUser,
      logoutUser,
      navigateModal
    }}>
      {children}
    </GalleryContext.Provider>
  );
}

// =========================================================================
// 🔐 2. COMPONENTE DE LOGIN (Reactivo)
// =========================================================================
function LoginView() {
  const { loginUser } = useContext(GalleryContext);
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      loginUser(username.trim()); // Actualiza el estado global al ingresar
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', color: '#fff', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '24px', width: '340px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <h2 style={{ textAlign: 'center', fontWeight: '500', marginBottom: '10px', letterSpacing: '0.5px' }}>Iniciar Sesión</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Nombre de Usuario</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Introduce tu usuario..." 
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', padding: '14px', borderRadius: '12px', color: '#fff', outline: 'none', fontSize: '1rem', transition: '0.3s' }}
            required
          />
        </div>

        <button 
          type="submit" 
          style={{ background: '#00d2ff', color: '#000', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: '0.2s', marginTop: '10px', boxShadow: '0 4px 15px rgba(0,210,255,0.3)' }}
        >
          Ingresar a la Galería
        </button>
      </form>
    </div>
  );
}

// =========================================================================
// 📸 3. VISTA DE LA GALERÍA (Protegida)
// =========================================================================
function GalleryContent() {
  const { 
    currentUser,
    logoutUser,
    demoPhotos, 
    selectedPhoto, 
    setSelectedPhoto,
    isModalOpen, 
    setIsModalOpen, 
    navigateModal 
  } = useContext(GalleryContext);

  // Sincronización requerida con el objeto global window
  useEffect(() => {
    window.closeModal = () => setIsModalOpen(false);
    window.navigateModal = (dir) => navigateModal(dir);
  }, [setIsModalOpen, navigateModal]);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '600' }}>
            Gallery Pro <span style={{ color: '#00d2ff', fontSize: '0.9rem', padding: '4px 8px', background: 'rgba(0,210,255,0.1)', borderRadius: '8px', marginLeft: '10px' }}>React Slice</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '5px' }}>
            Sesión activa: <span style={{ color: '#00d2ff', fontWeight: '600' }}>{currentUser}</span>
          </p>
        </div>
        <button 
          onClick={logoutUser}
          style={{ background: 'rgba(255,75,75,0.1)', border: '1px solid rgba(255,75,75,0.3)', color: '#ff4b4b', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '500', transition: '0.3s' }}
        >
          Cerrar Sesión
        </button>
      </header>

      {/* Grid de Contenido */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
        {demoPhotos.map((photo) => (
          <div 
            key={photo.id} 
            style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', borderRadius: '20px', cursor: 'pointer', transition: '0.3s' }}
            onClick={() => {
              setSelectedPhoto(photo);
              setIsModalOpen(true);
            }}
          >
            <div style={{ overflow: 'hidden', borderRadius: '14px' }}>
              <img src={photo.src} alt={photo.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginTop: '14px', fontWeight: '500' }}>{photo.title}</h3>
          </div>
        ))}
      </div>

      {/* Visor de Imagen Integrado */}
      {isModalOpen && selectedPhoto && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            style={{ position: 'absolute', left: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); navigateModal('prev'); }}
          >
            ❮
          </button>
          
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', padding: '20px', borderRadius: '24px', position: 'relative', maxWidth: '85%' }}>
            <button 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} style={{ maxHeight: '70vh', maxWidth: '100%', borderRadius: '14px', objectFit: 'contain' }} />
            <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '1.2rem' }}>{selectedPhoto.title}</div>
          </div>

          <button 
            style={{ position: 'absolute', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); navigateModal('next'); }}
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 🚀 4. ENRUTADOR Y CONTROL DE RENDERIZADO
// =========================================================================
function AppRouter() {
  const { currentUser } = useContext(GalleryContext);
  // Si no hay sesión iniciada muestra el Login, si la hay, renderiza la Galería
  return currentUser ? <GalleryContent /> : <LoginView />;
}

export default function App() {
  return (
    <GalleryProvider>
      <AppRouter />
    </GalleryProvider>
  );
}