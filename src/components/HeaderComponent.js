import React from 'react';
import '../assets/styles/HeaderComponent.css'; // Importar el archivo de estilos

function HeaderComponent() {
  return (
    <header>
      <img src="/assets/images/logovideojuegos.png" alt="Logo" className='logo' />
      <h1>videojuegos</h1>
    </header>
  );
}

export default HeaderComponent;
