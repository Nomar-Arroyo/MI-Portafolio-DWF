import React from 'react';
import { asignacionesData } from './data/asignaciones'; // <-- ¡AGREGA ESTA LÍNEA!
import AssignmentCard from './AssignmentCard';
import './index.css'; // O tus estilos correspondientes

function App() {
  return (
    <div className="portfolio-app">
      {/* Encabezado del Portafolio */}
      <header className="header">
        <div className="container header-content">
          <h1>Portafolio de Asignaciones</h1>
          <p className="subtitle">
            2do Trimestre - Desarrollo Web Frontend Esencial (HTML, CSS, JavaScript)
          </p>
          <div className="badge">Entorno React + Vite</div>
        </div>
      </header>

      {/* Sección Principal de Entregas */}
      <main className="container">
        <section className="grid-asignaciones">
          {/* Renderizado Limpio con .map() pasando los datos por Props */}
          {asignacionesData.map((item) => (
            <AssignmentCard 
              key={item.id} // Requerido por React para la estabilidad del DOM Virtual
              tag={item.tag}
              title={item.title}
              description={item.description}
              path={item.path}
              isReact={item.isReact}
            />
          ))}
        </section>
      </main>

      {/* Pie de página */}
      <footer className="footer">
        <p>&copy; 2026 - Portafolio de Evaluaciones DWF Esencial. Diseñado bajo estándares React.</p>
      </footer>
    </div>
  );
}

export default App;