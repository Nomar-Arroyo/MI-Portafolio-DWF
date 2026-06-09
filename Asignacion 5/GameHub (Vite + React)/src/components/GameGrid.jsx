import React from 'react';
import GameCard from './GameCard';

export default function GameGrid({ games }) {
  return (
    <main style={{ padding: '40px max(20px, calc((100% - 1200px) / 2))', backgroundColor: '#121212' }}>
      <h2 style={{ color: '#fff', fontFamily: 'sans-serif', marginBottom: '20px' }}>Catálogo Destacado</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px'
      }}>
        {games.map((game) => {
          // Auditoría: Usamos llaves {} y colocamos explícitamente el return solicitado en la clase
          return (
            <GameCard 
              key={game.id} // Requerimiento obligatorio de React
              title={game.title}
              category={game.category}
              rating={game.rating}
              description={game.description}
              image={game.image}
            />
          );
        })}
      </div>
    </main>
  );
}