// src/App.jsx
import React, { useState } from 'react';
import Header from './sections/Header/Header.jsx';
import RandomMeal from './sections/RandomMeal/RandomMeal.jsx';
import IngredientFilter from './sections/IngredientFilter/IngredientFilter.jsx';
import RecipeView from './components/RecipeView/RecipeView.jsx';
import Footer from './sections/Footer/Footer.jsx';
import './index.css';

function App() {
  // Estado global para la receta seleccionada que activa la pantalla completa
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Callback para limpiar el estado y regresar al inicio
  const handleBackToLanding = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="app-container">
      {selectedMeal ? (
        /* Si hay una receta seleccionada, se despliega la interfaz amplia en español */
        <RecipeView 
          meal={selectedMeal} 
          onBack={handleBackToLanding} 
        />
      ) : (
        /* Interfaz principal / Landing de inicio */
        <>
          <Header />
          <main className="main-content">
            {/* CRÍTICO: Pasamos onSelectMeal para que el generador aleatorio levante la interfaz amplia */}
            <RandomMeal onSelectMeal={setSelectedMeal} />
            
            <IngredientFilter onSelectMeal={setSelectedMeal} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;