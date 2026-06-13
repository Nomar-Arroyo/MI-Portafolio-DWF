import React, { useState } from 'react';

// 1. Imports Corregidos de la carpeta Sections (Rutas completas)
import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import Subscriptions from './sections/Subscriptions.jsx';
import Catalog from './sections/Catalog.jsx';
import Footer from './sections/Footer.jsx';

// 2. Imports Corregidos de la carpeta Components (Modales corregidos con "l" y sin duplicados)
import CartModal from './components/CartModal.jsx';
import AuthModal from './components/AuthModal.jsx';
import ProductCard from './components/ProductCard.jsx';

export default function App() {
  // --- Estados de Modales ---\r
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // --- Estados de Lógica de Negocio ---\r
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // --- Manejo del Carrito ---\r
  const handleAddToCart = (product) => {
    if (!user) {
      alert("Para añadir productos al carrito primero debes iniciar sesión.");
      setIsAuthOpen(true);
      return; // Detiene la ejecución para que no se sume al carrito
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // --- Manejo de Suscripción Directa ---\r
  const handleSubscribeClick = (planTitle) => {
    if (!user) {
      alert(`Para suscribirte al plan "${planTitle}" primero debes iniciar sesión.`);
      setIsAuthOpen(true);
    } else {
      alert(`¡Felicidades ${user}! Te has suscrito exitosamente al "${planTitle}".`);
    }
  };

  return (
    <>
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        user={user}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
      />

      <Hero onOpenAuth={() => setIsAuthOpen(true)} user={user} />

      <Subscriptions onSubscribeClick={handleSubscribeClick} />

      <Catalog onAddToCart={handleAddToCart} />

      <Footer />

      {/* --- Capa de Modales Controlados de Interfaz --- */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(username) => setUser(username)}
      />
    </>
  );
}