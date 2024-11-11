import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './pages/pagesLogin/userContext'; // Importar el contexto
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import JuegoPage from './pages/pagesJuego/juegoPage';
import DetalleJuego from './pages/pagesJuego/detalleJuego';
import LoginPage from './pages/pagesLogin/loginPage';
import RegisterPage from './pages/pagesRegistro/registerPage';
import CalificacionPage from './pages/pagesCalificacion/calificacionPage';


function App() {

  return (
    <UserProvider>
      <Router>
        <HeaderComponent />
        <NavBarComponent />
        <Routes>

          <Route path="/" element={<JuegoPage/>} />

          <Route path="/calificacion" element={<CalificacionPage/>} />

          <Route path="/juegos/:id" element={<DetalleJuego/>} />

          <Route path="/register" element={<RegisterPage/>} />

          <Route path="/login" element={<LoginPage/>} />
          
        </Routes>
        <FooterComponent />
      </Router>
    </UserProvider>
  );
}

export default App;
