import React from 'react';

export const ProductCard = ({ product, onAddToCart, onSelectProduct }) => {
  return (
    <div 
  style={styles.card} 
  onClick={() => {
    console.log("¡Tarjeta clickeada!", product.title); // <-- AÑADE ESTA LÍNEA TEMPORAL
    onSelectProduct(product);
  }}
>
      {/* Contenedor corregido y centrado */}
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.title} style={styles.image} />
      </div>
      
      {/* Información */}
      <div style={styles.infoContainer}>
        <span style={styles.category}>{product.category}</span>
        <h3 style={styles.title}>{product.title}</h3>
        <p style={styles.price}>${product.price}</p>
        
        {/* Botón interactivo para el Carrito */}
        <button style={styles.addBtn} onClick={() => onAddToCart(product)}>
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  imageContainer: { 
    width: '100%', 
    height: '150px', 
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center', 
    overflow: 'hidden', 
    marginBottom: '12px'
  },
  image: { 
    maxWidth: '100%', 
    maxHeight: '100%', 
    objectFit: 'contain' 
  },
  infoContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px', 
    flexGrow: 1, 
    justifyContent: 'space-between' 
  },
  category: { 
    fontSize: '0.75rem', 
    color: '#999', 
    textTransform: 'uppercase', 
    fontWeight: 'bold' 
  },
  // SOLUCIÓN AL CORTE: Quitamos el 'height: 40px' rígido. 
  // Ahora limitamos a un máximo de 2 líneas elegantes y añade los tres puntos '...' si es sumamente largo, sin colisionar abajo.
  title: { 
    fontSize: '0.95rem', 
    color: '#333', 
    margin: '0', 
    lineHeight: '1.3',
    maxHeight: '2.6em', 
    overflow: 'hidden', 
    display: '-webkit-box', 
    WebkitLineClamp: 2, 
    WebkitBoxOrient: 'vertical' 
  },
  price: { 
    fontSize: '1.1rem', 
    fontWeight: 'bold', 
    color: '#2ecc71', 
    margin: '4px 0' 
  },
  addBtn: { 
    width: '100%', 
    padding: '10px', 
    backgroundColor: '#007bff', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '6px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    fontSize: '0.85rem', 
    marginTop: 'auto' 
  }
};