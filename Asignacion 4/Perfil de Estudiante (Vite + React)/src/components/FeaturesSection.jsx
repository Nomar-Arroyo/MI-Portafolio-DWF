import React from 'react';
import FeatureCard from './FeatureCard';

function FeaturesSection({ habilidades, proyectos }) {
  return (
    <section className="features-section">
      
      <div id="habilidades" className="feature-group">
        <h2>Mis Habilidades</h2>
        <div className="grid-container">
          {habilidades.map(hab => (
            <FeatureCard key={hab.id} titulo={hab.titulo} descripcion={hab.descripcion} />
          ))}
        </div>
      </div>

      <div id="proyectos" className="feature-group">
        <h2>Proyectos Recientes</h2>
        <div className="grid-container">
          {proyectos.map(proy => (
            <FeatureCard key={proy.id} titulo={proy.titulo} descripcion={proy.descripcion} isProject={true} />
          ))}
        </div>
      </div>

    </section>
  );
}

export default FeaturesSection;