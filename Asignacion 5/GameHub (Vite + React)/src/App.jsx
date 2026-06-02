import React from 'react';
import Header from './components/Header';
import GameGrid from './components/GameGrid';
import Footer from './components/Footer';
import { gamesData } from './data/gamesData';

export default function App() {
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Header />
      {/* Pasamos los datos del array como props al contenedor */}
      <GameGrid games={gamesData} />
      <Footer />
    </div>
  );
}