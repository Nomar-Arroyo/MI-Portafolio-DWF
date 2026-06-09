import React, { useState } from 'react';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Navegación: 'inicio', 'tienda' o 'carrito'
  const [view, setView] = useState('inicio'); 
  // Estado para el carrito de compras
  const [cart, setCart] = useState([]);

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Si ya existe, incrementamos la cantidad
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Si es nuevo, lo agregamos con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calcular el total de productos guardados en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calcular el precio total de la compra
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div style={styles.container}>
      {/* BARRA DE NAVEGACIÓN */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => setView('inicio')}>🛒 Fake Store</div>
        <div style={styles.navLinks}>
          <button 
            style={{...styles.navBtn, fontWeight: view === 'inicio' ? 'bold' : 'normal'}} 
            onClick={() => setView('inicio')}
          >
            Inicio
          </button>
          <button 
            style={{...styles.navBtn, fontWeight: view === 'tienda' ? 'bold' : 'normal'}} 
            onClick={() => setView('tienda')}
          >
            Tienda
          </button>
          <button 
            style={{...styles.navBtn, ...styles.cartBtnNavbar, fontWeight: view === 'carrito' ? 'bold' : 'normal'}} 
            onClick={() => setView('carrito')}
          >
            Carrito <span>({totalItems})</span>
          </button>
        </div>
      </nav>

      {/* RENDERIZADO CONDICIONAL DE VISTAS */}
      <main style={styles.main}>
        {view === 'inicio' && (
          <div style={styles.heroSection}>
            <h1>¡Bienvenido a tu Tienda Virtual!</h1>
            <p>Descubre un catálogo interactivo con filtros avanzados y gestión de pedidos.</p>
            <button style={styles.ctaBtn} onClick={() => setView('tienda')}>
              Ir a la Tienda
            </button>
          </div>
        )}
        
        {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}
      
        {view === 'tienda' && (
          <ProductGrid 
            onAddToCart={addToCart} 
            onSelectProduct={setSelectedProduct}
          />
        )}

        {view === 'carrito' && (
          <div style={styles.cartPage}>
            <h2>Tu Carrito de Compras</h2>
            {cart.length === 0 ? (
              <div style={styles.emptyCart}>
                <p>El carrito está vacío.</p>
                <button style={styles.ctaBtn} onClick={() => setView('tienda')}>Volver a la tienda</button>
              </div>
            ) : (
              <div style={styles.cartContent}>
                {/* Lista de productos agregados */}
                <div style={styles.cartList}>
                  {cart.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <img src={item.image} alt={item.title} style={styles.cartItemImg} />
                      <div style={styles.cartItemDetails}>
                        <h4>{item.title}</h4>
                        <p>${item.price} x {item.quantity}</p>
                      </div>
                      <button style={styles.deleteBtn} onClick={() => removeFromCart(item.id)}>
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
                {/* Resumen de Compra */}
                <div style={styles.cartSummary}>
                  <h3>Resumen de Pedido</h3>
                  <p><strong>Total de artículos:</strong> {totalItems}</p>
                  <p style={styles.totalPriceText}><strong>Total a pagar:</strong> ${totalPrice}</p>
                  <button style={styles.checkoutBtn} onClick={() => alert('¡Gracias por tu simulación de compra!')}>
                    Proceder al pago
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #eee' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#333', cursor: 'pointer' },
  navLinks: { display: 'flex', gap: '15px' },
  navBtn: { background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', color: '#555' },
  cartBtnNavbar: { backgroundColor: '#e2f0fe', padding: '6px 12px', borderRadius: '20px', color: '#007bff' },
  main: { marginTop: '30px' },
  heroSection: { textAlign: 'center', padding: '60px 20px', backgroundColor: '#f9f9f9', borderRadius: '12px' },
  ctaBtn: { padding: '12px 24px', fontSize: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '15px' },
  cartPage: { paddingBottom: '40px' },
  emptyCart: { textAlign: 'center', padding: '40px 0', color: '#777' },
  cartContent: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginTop: '20px' },
  cartList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  cartItem: { display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff' },
  cartItemImg: { width: '60px', height: '60px', objectFit: 'contain' },
  cartItemDetails: { flex: 1 },
  deleteBtn: { backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  cartSummary: { padding: '20px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fdfdfd', height: 'fit-content' },
  totalPriceText: { fontSize: '1.2rem', color: '#2ecc71', margin: '15px 0' },
  checkoutBtn: { width: '100%', padding: '12px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }
};

export default App;