import React from 'react';

function Footer({ nombre }) {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} {nombre}. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;