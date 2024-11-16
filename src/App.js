import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
//
import JuegoPage from './pages/pagesJuego/juegoPage';
import DetalleJuego from './pages/pagesJuego/detalleJuego';
import AltaJuego from './pages/pagesJuego/altaJuego';
import SoporteJuego from './pages/pagesJuego/soporteJuego';
//
import LoginPage from './pages/pagesLogin/loginPage';
import RegisterPage from './pages/pagesRegistro/registerPage';
import CalificacionPage from './pages/pagesCalificacion/calificacionPage';

function App() {

  return (
      <Router>
        <HeaderComponent />
        <NavBarComponent />
        <Routes>

          <Route path="/" element={<JuegoPage/>} />

          <Route path="/calificacion" element={<CalificacionPage/>} />

          <Route path="/juego" element={<AltaJuego/>} />

          <Route path="/soporte" element={<SoporteJuego/>} />

          <Route path="/juegos/:id" element={<DetalleJuego/>} />

          <Route path="/register" element={<RegisterPage/>} />

          <Route path="/login" element={<LoginPage/>} />
          
        </Routes>
        <FooterComponent />
      </Router>
  );
}

export default App;
