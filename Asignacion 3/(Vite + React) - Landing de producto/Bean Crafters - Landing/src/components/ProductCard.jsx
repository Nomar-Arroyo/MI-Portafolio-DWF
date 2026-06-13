import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const { name, category, price, rating, image, notes, roast } = product;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <span className="product-badge">{category}</span>
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-title">{name}</h3>
          <span className="product-rating">★ {rating}</span>
        </div>
        <p className="product-notes"><strong>Notas:</strong> {notes}</p>
        <div className="product-meta">
          <span className="product-roast">Tueste: {roast}</span>
          <span className="product-price">${price.toFixed(2)}</span>
        </div>
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
}