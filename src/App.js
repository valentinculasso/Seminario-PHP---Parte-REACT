import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';

function App() {
  return (
    <Router>
      <HeaderComponent />
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<h2>Bienvenido a Videojuegos</h2>} />
        <Route path="/juegos" element={<h2>Listado de Juegos</h2>} />
        <Route path="/registro" element={<h2>Registro</h2>} />
        <Route path="/login" element={<h2>Login</h2>} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}


export default App;
