// src/AssignmentCard.jsx
import React from 'react';

function AssignmentCard({ tag, title, description, path }) {
  return (
    <div className="card">
      <div>
        <div className="card-tag">
          {tag}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      
      <a 
        href={path} 
        className="btn"
      >
        Visitar Asignación ➔
      </a>
    </div>
  );
}

export default AssignmentCard;