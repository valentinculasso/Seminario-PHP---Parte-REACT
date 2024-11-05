import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import JuegoPage from './pages/pagesJuego/juegoPage';
import LoginPage from './pages/pagesLogin/loginPage';
import RegisterPage from './pages/pagesRegistro/registerPage';

function App() {
  return (
    <Router>
      <HeaderComponent />
      <NavBarComponent />
      <Routes>

        <Route path="/" element={<h2>Bienvenido a Videojuegos</h2>} />

        <Route path="/juegos" element={<JuegoPage/>} />

        <Route path="/registro" element={<RegisterPage/>} />

        <Route path="/login" element={<LoginPage/>} />
              
      </Routes>
      <FooterComponent />
    </Router>
  );
}

// Fetch nativo javascript , axios dependencia


export default App;
