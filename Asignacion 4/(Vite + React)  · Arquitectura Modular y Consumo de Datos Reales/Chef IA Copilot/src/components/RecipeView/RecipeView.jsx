import React, { useState, useEffect } from 'react';
import './RecipeView.css';

const RecipeView = ({ meal, onBack }) => {
  const [translatedInstructions, setTranslatedInstructions] = useState([]);
  const [translatedIngredients, setTranslatedIngredients] = useState([]);
  const [isTranslating, setIsTranslating] = useState(true);

  // Esta es la sub-función que hace el fetch real a la API cuidando no pasar los 500 caracteres
  const enviarAPITraduccion = async (texto) => {
    if (!texto || texto.trim() === "") return "";
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|es&de=nomararroyo572006@gmail.com`
      );
      const data = await res.json();
      return data.responseData?.translatedText || texto;
    } catch (error) {
      console.error("Error al traducir fragmento:", error);
      return texto;
    }
  };

  // Dividimos el texto largo por puntos para no cortar oraciones a la mitad
  const traducirTextoLargo = async (textoOriginal) => {
    if (!textoOriginal) return "";

    const oraciones = textoOriginal.split(/(?<=\.)\s+/);
    let resultadoTraducido = [];
    let fragmentoActual = "";

    for (const oracion of oraciones) {
      if ((fragmentoActual + oracion).length > 400) { 
        const traducido = await enviarAPITraduccion(fragmentoActual.trim());
        resultadoTraducido.push(traducido);
        fragmentoActual = oracion + " ";
      } else {
        fragmentoActual += oracion + " ";
      }
    }

    if (fragmentoActual.trim().length > 0) {
      const traducido = await enviarAPITraduccion(fragmentoActual.trim());
      resultadoTraducido.push(traducido);
    }

    return resultadoTraducido.join(" ");
  };

  useEffect(() => {
    const handleTranslation = async () => {
      setIsTranslating(true);
      
      // 1. Traducir las instrucciones principales
      const cleanInstructions = meal.strInstructions || "";
      const instructionsEs = await traducirTextoLargo(cleanInstructions);
      
      // --- NUEVA LÓGICA PARA SEPARAR PASOS ---
      // Dividimos el texto traducido por puntos seguidos de un espacio para crear un arreglo de pasos
      const pasosProcesados = instructionsEs
        .split(/(?<=\.)\s+/)
        // Filtramos líneas vacías o pasos que sean solo números/espacios sueltos
        .map(paso => paso.trim())
        .filter(paso => paso.length > 3);

      setTranslatedInstructions(pasosProcesados);

      // 2. Extraer y traducir los ingredientes dinámicos estructurados
      const ingredientsList = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
          ingredientsList.push({
            originalIngredient: ingredient.trim(),
            originalMeasure: measure ? measure.trim() : ""
          });
        }
      }

      const translatedList = await Promise.all(
        ingredientsList.map(async (item) => {
          const ingredientEs = await enviarAPITraduccion(item.originalIngredient);
          const measureEs = await enviarAPITraduccion(item.originalMeasure);
          return `${measureEs} de ${ingredientEs}`;
        })
      );

      setTranslatedIngredients(translatedList);
      setIsTranslating(false);
    };

    if (meal) {
      handleTranslation();
    }
  }, [meal]);

  return (
    <article className="recipe-view-container">
      <button className="btn-back-home" onClick={onBack}>
        🔙 ¿Qué más te gustaría preparar?
      </button>

      <div className="recipe-header">
        <h2 className="recipe-main-title">{meal.strMeal}</h2>
        <p className="recipe-meta-tags">
          📌 Categoría: {meal.strCategory} | 🗺️ Origen: {meal.strArea}
        </p>
      </div>

      <div className="recipe-grid-layout">
        <div className="recipe-image-wrapper">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            className="recipe-main-img" 
          />
        </div>
        
        <div className="recipe-ingredients-box">
          <h3>🛒 Ingredientes</h3>
          {isTranslating ? (
            <p className="translating-hint">🔄 Traduciendo ingredientes al español...</p>
          ) : (
            <ul className="ingredients-list">
              {translatedIngredients.map((ing, index) => (
                <li key={index}>🔹 {ing}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="recipe-steps-box">
        <h3>📖 Preparación Paso a Paso</h3>
        {isTranslating ? (
          <div className="translation-loader">
            <div className="mini-spinner"></div>
            <p>Traduciendo instrucciones al español para ti...</p>
          </div>
        ) : (
          /* MODIFICADO: Lista ordenada con las etiquetas de Paso X */
          <ol className="recipe-steps-list">
            {translatedInstructions.map((paso, index) => (
              <li key={index} className="recipe-step-item">
                <strong>Paso {index + 1}:</strong> {paso}
              </li>
            ))}
          </ol>
        )}
      </div>

      {meal.strYoutube && (
        <div className="recipe-video-box">
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-youtube"
          >
            <span>📺 Ver Tutorial en YouTube</span>
          </a>
        </div>
      )}
    </article>
  );
};

export default RecipeView;