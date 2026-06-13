import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Bean<span>Crafters</span></h3>
          <p>Trazabilidad, pureza y excelencia desde la finca directa a tu taza.</p>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} BeanCrafters Inc. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}