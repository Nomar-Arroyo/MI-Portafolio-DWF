import React from 'react';
import './MealCard.css';

const MealCard = ({ meal }) => {
  return (
    <div className="meal-card">
      <div className="meal-card-image-wrapper">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-card-img" />
        {meal.strCategory && <span className="meal-card-category">{meal.strCategory}</span>}
      </div>
      <div className="meal-card-content">
        <h3 className="meal-card-title">{meal.strMeal}</h3>
        {meal.strArea && <p className="meal-card-area">📍 Origen: {meal.strArea}</p>}
        {meal.strInstructions ? (
          <details className="meal-instructions-details">
            <summary>Ver Receta Paso a Paso</summary>
            <p className="meal-instructions-text">{meal.strInstructions}</p>
          </details>
        ) : (
          <p className="meal-card-tap-hint">Usa el filtro para descubrir su preparación completa</p>
        )}
      </div>
    </div>
  );
};

export default MealCard;