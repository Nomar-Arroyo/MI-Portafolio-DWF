import React from 'react';

function FeatureCard({ titulo, descripcion, isProject }) {
  return (
    <div className={`feature-card ${isProject ? 'project-card' : ''}`}>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
}

export default FeatureCard;