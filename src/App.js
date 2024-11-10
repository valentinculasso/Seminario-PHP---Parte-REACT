import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import JuegoPage from './pages/pagesJuego/juegoPage';
import DetalleJuego from './pages/pagesJuego/detalleJuego';
import LoginPage from './pages/pagesLogin/loginPage';
import RegisterPage from './pages/pagesRegistro/registerPage';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
        setUser({ username, token });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
};

  return (
    <Router>
      <HeaderComponent />
      <NavBarComponent user={user} onLogout={handleLogout}/>
      <Routes>

        <Route path="/" element={<JuegoPage/>} />

        <Route path="/juegos/:id" element={<DetalleJuego/>} />

        <Route path="/register" element={<RegisterPage/>} />

        <Route path="/login" element={<LoginPage/>} />
              
      </Routes>
      <FooterComponent />
    </Router>
  );
}

// Fetch nativo javascript , axios dependencia


export default App;
