import React from 'react';
import { productsData } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

export default function Catalog({ onAddToCart }) {
  return (
    <section id="catalog" className="catalog-section">
      <div className="section-header">
        <span className="section-tag">Colección Permanente</span>
        <h2>Pedidos Regulares Individuales</h2>
        <p>Selecciona tu lote de especialidad molido o en grano con entrega inmediata a tu domicilio.</p>
      </div>

      <div className="products-grid">
        {productsData.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </section>
  );
}