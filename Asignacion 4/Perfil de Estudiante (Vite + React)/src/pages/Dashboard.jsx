import React, { useState } from 'react';

function Dashboard() {
  // Simulando datos que vendrán de la base de datos
  const [foto, setFoto] = useState("https://via.placeholder.com/150");

  const handleSubirFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Truco temporal para ver la foto en el navegador (luego se enviará al backend)
      setFoto(URL.createObjectURL(file));
    }
  };

  return (
    <section className="dashboard">
      <div className="perfil-header">
        <div className="foto-container">
          <img src={foto} alt="Perfil" className="hero-avatar" />
          <label className="btn-upload">
            Cambiar Foto
            <input type="file" accept="image/*" onChange={handleSubirFoto} hidden />
          </label>
        </div>
        
        <div className="info-estudiante">
          <h2>Panel de Control Estudiantil</h2>
          <p>Trimestre Actual: <strong>Segundo Trimestre</strong></p>
          <p>Carrera: Ingeniería / Desarrollo Web</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;