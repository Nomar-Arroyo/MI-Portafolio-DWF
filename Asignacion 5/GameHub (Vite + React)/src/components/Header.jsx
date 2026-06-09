import React from 'react';

export default function Header() {
  return (
    <header style={{ backgroundColor: '#111', padding: '20px', textAlignment: 'center', borderBottom: '2px solid #00ffcc' }}>
      <h1 style={{ color: '#00ffcc', margin: 0, fontSize: '2.5rem', fontFamily: 'sans-serif' }}>🎮 GameHub</h1>
      <p style={{ color: '#888', margin: '5px 0 0 0' }}>Tu bóveda digital de videojuegos favoritos</p>
    </header>
  );
}