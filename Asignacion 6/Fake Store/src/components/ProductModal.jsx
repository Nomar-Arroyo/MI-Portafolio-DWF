import React from 'react';

export const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      {/* Evitamos que el clic dentro del modal lo cierre */}
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <div style={styles.body}>
          <div style={styles.imageContainer}>
            <img src={product.image} alt={product.title} style={styles.image} />
          </div>
          
          <div style={styles.details}>
            <span style={styles.category}>{product.category}</span>
            <h2 style={styles.title}>{product.title}</h2>
            <p style={styles.price}>${product.price}</p>
            
            <div style={styles.descriptionContainer}>
              <h4>Descripción:</h4>
              <p style={styles.description}>{product.description || 'Sin descripción disponible.'}</p>
            </div>

            <button 
              style={styles.addBtn} 
              onClick={() => {
                onAddToCart(product);
                onClose(); // Cierra el modal tras añadir si lo deseas
              }}
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' },
  modalContent: { backgroundColor: '#fff', borderRadius: '12px', maxWidth: '800px', width: '100%', padding: '30px', position: 'relative', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' },
  closeBtn: { position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#666' },
  body: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '10px' },
  imageContainer: { width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  image: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  details: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  category: { fontSize: '0.85rem', color: '#999', textTransform: 'uppercase', fontWeight: 'bold' },
  title: { fontSize: '1.4rem', color: '#333', margin: '10px 0' },
  price: { fontSize: '1.6rem', fontWeight: 'bold', color: '#2ecc71', margin: '10px 0' },
  descriptionContainer: { margin: '15px 0', flexGrow: 1 },
  description: { color: '#666', lineHeight: '1.5', fontSize: '0.95rem' },
  addBtn: { width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '15px' }
};