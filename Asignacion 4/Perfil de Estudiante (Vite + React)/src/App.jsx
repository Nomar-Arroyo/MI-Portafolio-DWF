import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProyectosView from './pages/ProyectosView';
import './App.css';

function App() {
  // Estado simulado de autenticación (Más adelante esto lo validará tu API en Flask)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Header setIsAuthenticated={setIsAuthenticated} />}
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/perfil" /> : <Login onLogin={() => setIsAuthenticated(true)} />} 
            />
            <Route 
              path="/perfil" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/proyectos" 
              element={isAuthenticated ? <ProyectosView /> : <Navigate to="/login" />} 
            />
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>

        <Footer nombre="Plataforma Estudiantil" />
      </div>
    </Router>
  );
}

export default App;