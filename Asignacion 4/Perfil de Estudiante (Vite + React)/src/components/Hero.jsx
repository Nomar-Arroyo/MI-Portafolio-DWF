import React from 'react';

function Hero({ nombre, carrera, foto }) {
  const handleContacto = () => {
    alert(`¡Gracias por tu interés! Te responderé en el correo registrado de ${nombre}.`);
  };

  return (
    <section id="perfil" className="hero">
      <img src={foto} alt={`Foto de ${nombre}`} className="hero-avatar" />
      <h1 className="hero-name">{nombre}</h1>
      <p className="hero-career">{carrera}</p>
      <button className="btn-contacto" onClick={handleContacto}>
        Contactar conmigo
      </button>
    </section>
  );
}

export default Hero;