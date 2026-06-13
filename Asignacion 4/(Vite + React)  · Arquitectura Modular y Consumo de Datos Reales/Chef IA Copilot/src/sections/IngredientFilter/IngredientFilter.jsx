import React, { useState } from 'react';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import './IngredientFilter.css';

// Lista expandida de ingredientes comunes en la nevera del usuario
const POPULAR_INGREDIENTS = [
  { id: 'chicken', name: '🍗 Pollo' },
  { id: 'beef', name: '🥩 Carne de Res' },
  { id: 'pork', name: '🥓 Cerdo' },
  { id: 'salmon', name: '🐟 Salmón' },
  { id: 'tomato', name: '🍅 Tomate' },
  { id: 'potato', name: '🥔 Papa / Patata' },
  { id: 'garlic', name: '🧄 Ajo' },
  { id: 'onion', name: '🧅 Cebolla' },
  { id: 'cheese', name: '🧀 Queso' },
  { id: 'egg', name: '🥚 Huevo' },
  { id: 'rice', name: '🍚 Arroz' },
  { id: 'pasta', name: '🍝 Pasta' }
];

const IngredientFilter = ({ onSelectMeal }) => {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleIngredientClick = async (ingredientId) => {
    setSelectedIngredient(ingredientId);
    setStatus({ type: 'loading', message: 'Buscando recetas ideales con lo que tienes...' });
    setMeals([]);

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientId}`);
      const data = await response.json();

      if (data.meals) {
        setMeals(data.meals.slice(0, 8)); // Limitamos a 8 sugerencias atractivas
        setStatus({ type: '', message: '' });
      } else {
        setMeals([]);
        setStatus({ type: 'error', message: 'No encontramos recetas con ese ingrediente exacto. ¡Prueba otro!' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error de red al conectar con el refrigerador virtual.' });
    }
  };

  // Función crítica: Al clickear la sugerencia, busca el detalle completo (instrucciones) y lo despacha
  const fetchFullMealDetails = async (idMeal) => {
    setStatus({ type: 'loading', message: 'Abriendo bitácora de cocina...' });
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        onSelectMeal(data.meals[0]); // Envía la receta completa al estado centralizado de App
        setStatus({ type: '', message: '' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'No se pudo cargar el paso a paso de esta receta.' });
    }
  };

  return (
    <section className="ingredient-filter-section container">
      <div className="section-title-box">
        <h2>🔍 Filtro Inteligente: ¿Qué hay en tu nevera?</h2>
        <p>Selecciona un ingrediente principal que tengas a la mano y te diremos qué magia preparar hoy.</p>
      </div>

      <div className="ingredients-grid">
        {POPULAR_INGREDIENTS.map((ing) => (
          <button
            key={ing.id}
            className={`ingredient-badge ${selectedIngredient === ing.id ? 'active' : ''}`}
            onClick={() => handleIngredientClick(ing.id)}
          >
            {ing.name}
          </button>
        ))}
      </div>

      {status.type && <StatusMessage type={status.type} message={status.message} />}

      {meals.length > 0 && (
        <div className="filter-results-box">
          <h3>💡 Recetas Recomendadas para Ti:</h3>
          <div className="filter-meals-grid">
            {meals.map((meal) => (
              <div 
                key={meal.idMeal} 
                className="filter-meal-item-card"
                onClick={() => fetchFullMealDetails(meal.idMeal)}
              >
                <img src={meal.strMealThumb} alt={meal.strMeal} className="filter-meal-thumb" />
                <div className="filter-meal-info">
                  <h4>{meal.strMeal}</h4>
                  <span className="tap-action-indicator">Ver paso a paso →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default IngredientFilter;