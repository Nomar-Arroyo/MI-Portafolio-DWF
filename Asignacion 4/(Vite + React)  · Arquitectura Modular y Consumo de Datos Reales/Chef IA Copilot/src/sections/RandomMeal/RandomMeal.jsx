// src/components/RandomMeal/RandomMeal.jsx
import React, { useState } from 'react';
import './RandomMeal.css';

function RandomMeal({ onSelectMeal }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomMeal = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (!response.ok) {
        throw new Error('Error al conectar con la API de recetas.');
      }
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setMeal(data.meals[0]);
      } else {
        throw new Error('No se encontró ninguna receta.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="random-meal-section">
      <h2>¿No sabes qué cocinar hoy?</h2>
      <p>Deja que el destino decida por ti con una receta totalmente aleatoria.</p>
      
      <button 
        className="btn-random" 
        onClick={fetchRandomMeal} 
        disabled={loading}
      >
        {loading ? 'Buscando inspiración...' : '🎲 Generar Receta Aleatoria'}
      </button>

      {error && <p className="error-message">⚠️ {error}</p>}

      {meal && !loading && (
        <div className="random-meal-preview-card">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            className="meal-preview-img" 
          />
          <div className="meal-preview-info">
            <h3>{meal.strMeal}</h3>
            <p className="meal-tag">📌 Categoría: {meal.strCategory} | Origen: {meal.strArea}</p>
            
            {/* SOLUCIÓN AL CLIC: Dispara el callback hacia App.jsx pasando el objeto completo de la receta */}
            <button 
              className="btn-view-steps" 
              onClick={() => onSelectMeal(meal)}
            >
              📖 Ver receta paso a paso
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default RandomMeal;