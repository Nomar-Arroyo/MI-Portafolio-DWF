import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} - ¿Qué Cocino Hoy? App Inc.</p>
        <p>Hecho con criterio y amor por el código modular • API externa provista por TheMealDB</p>
      </div>
    </footer>
  );
};

export default Footer;