import React from 'react';
import './CartModal.css';

export default function CartModal({ isOpen, onClose, cartItems, onRemoveItem }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tu Carrito</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-content">
          {cartItems.length === 0 ? (
            <p className="empty-message">No tienes productos en el carrito aún.</p>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>{item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                  <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="modal-footer">
            <div className="total-container">
              <span>Total:</span>
              <span className="total-price">${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={() => alert('¡Procesando pedido de especialidad!')}>
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
}