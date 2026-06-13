import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Carga de las variables culinarias premium y el reset global

// El StrictMode ayuda a detectar efectos secundarios o bugs durante la etapa de desarrollo
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);