import React from 'react';
import FeatureCard from '../components/FeatureCard';

function ProyectosView() {
  // Datos simulados
  const proyectos = [
    { id: 1, titulo: "Sistema Clínico IA", descripcion: "Plataforma de monitoreo automatizado de signos vitales para asistencia médica." },
    { id: 2, titulo: "Galería Dinámica", descripcion: "Componente interactivo y dinámico para visualizar imágenes." }
  ];

  return (
    <div className="vista-ampliada">
      <h2>Mis Proyectos del Trimestre</h2>
      <p>Aquí puedes documentar todo lo aprendido y desarrollado en cada etapa académica.</p>
      
      <div className="grid-container-large">
        {proyectos.map(proy => (
          <FeatureCard key={proy.id} titulo={proy.titulo} descripcion={proy.descripcion} isProject={true} />
        ))}
      </div>
    </div>
  );
}

export default ProyectosView;