import React, { useState } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ onAddToCart, onSelectProduct }) => {
  const { products, loading, error } = useFetchProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  if (loading) return <div style={styles.center}>Cargando catálogo...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  // Obtener categorías únicas dinámicamente
  const categories = ['todas', ...new Set(products.map(p => p.category))];

  // Filtrado reactivo (Buscador + Botón de Categorías)
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* SECCIÓN DE BUSCADOR Y CATEGORÍAS */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="🔎 Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.categoryContainer}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...styles.categoryBtn,
                backgroundColor: selectedCategory === category ? '#007bff' : '#eee',
                color: selectedCategory === category ? '#fff' : '#333'
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* REJILLA DE PRODUCTOS */}
      {filteredProducts.length === 0 ? (
        <div style={styles.center}>No hay productos que coincidan con los filtros.</div>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ESTILOS PROPIOS DE LA GRILLA (Limpios y sin errores de sintaxis)
const styles = {
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
    gap: '20px', 
    paddingBottom: '40px' 
  },
  center: { 
    textAlign: 'center', 
    padding: '40px', 
    fontSize: '1.2rem' 
  },
  error: { 
    textAlign: 'center', 
    color: '#e74c3c', 
    padding: '40px', 
    fontWeight: 'bold' 
  },
  filterContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px', 
    marginBottom: '30px' 
  },
  searchInput: { 
    padding: '12px 15px', 
    fontSize: '1rem', 
    borderRadius: '6px', 
    border: '1px solid #ccc', 
    width: '100%', 
    maxWidth: '400px' 
  },
  categoryContainer: { 
    display: 'flex', 
    gap: '10px', 
    flexWrap: 'wrap' 
  },
  categoryBtn: { 
    padding: '8px 16px', 
    border: 'none', 
    borderRadius: '20px', 
    cursor: 'pointer', 
    fontSize: '0.9rem' 
  }
};