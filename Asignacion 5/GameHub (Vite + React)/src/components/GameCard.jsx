import React from 'react';

export default function GameCard({ title, category, rating, description, image }) {
  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '8px',
      overflow: 'hidden',
      color: '#fff',
      fontFamily: 'sans-serif',
      transition: 'transform 0.2s'
    }}>
      <img src={image} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '15px' }}>
        <span style={{ fontSize: '0.8rem', color: '#00ffcc', textTransform: 'uppercase', fontWeight: 'bold' }}>{category}</span>
        <h3 style={{ margin: '10px 0', fontSize: '1.4rem' }}>{title}</h3>
        <p style={{ color: '#aaa', fontSize: '0.9rem', height: '60px', overflow: 'hidden' }}>{description}</p>
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#ffcc00', fontWeight: 'bold' }}>⭐ {rating}</span>
          <button style={{ backgroundColor: '#00ffcc', color: '#000', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
}