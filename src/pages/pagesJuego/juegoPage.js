import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import { Link } from 'react-router-dom'; // Este import me permite que al hacerle click a un nombre de juego (enlace) se ejecute detalleJuego.js en otras palabras me lleve a la URL de ese juego
import './juegoPage.css'; // Este import importa el archivo CSS para estilos

function JuegoPage() {
    // Defin los estados inicial para almacenar la lista de juegos y el número de página
    const [juegos, setJuegos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null); // Estado para manejar errores en la carga de datos

    const juegosPorPagina = 5;

    // useEffect se ejecuta cada vez que 'pagina' cambia, llamando a fetchGameData
    useEffect(() => {
        fetchGameData(pagina);
    }, [pagina]);

    // Función para obtener los datos de los juegos desde el backend
    const fetchGameData = (pagina) => {
        // Realiza una solicitud GET a la API, pasando la página actual como parámetro
        api.get(`/juegos?pagina=${pagina}`)
            .then((response) => {
                // Si la solicitud es exitosa, guarda los datos de los juegos en el estado
                setJuegos(response.data.result);
                setTotal(response.data.total);
                setError(null); // Reinicia el estado de error si los datos se cargan correctamente
            })
            .catch((error) => {
                // Manejo de errores: verifica si el error es específico (404) o genérico
                if (error.response && error.response.status === 404) {
                    setError("No hay juegos que mostrar en esta página."); // Mensaje de error específico para 404
                } else {
                    setError("Hubo un problema al cargar los juegos.");
                }
                setJuegos([]); // Vacio la lista de juegos si hay un error
            });
    };

    // Función para avanzar a la siguiente página
    const handlePaginaSiguiente = () => {
        if(pagina < Math.ceil(total / juegosPorPagina)){
            setPagina((prevPagina) => prevPagina + 1); // Pagina + 1
        }
    };

    // Función para retroceder a la página anterior
    const handlePaginaAnterior = () => {
        if (pagina > 1) {
            setPagina((prevPagina) => prevPagina - 1); // Pagina - 1
        }
    };

    // Faltaria agregarle los filtros y ya despues hacer bien el css

    return (
        <div className="juego-page">
            {/* Tabla para mostrar la lista de juegos */}
            <table className="juego-table">
                <thead>
                    <tr>
                        <th>Id del juego</th>
                        <th>Nombre del juego</th>
                        <th>Clasificacion por edad</th>
                        <th>Plataforma</th>
                        <th>Calificación Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    {juegos.map((juego) => (
                        <tr key={juego.id_juego}>
                            <td>{juego.id_juego}</td>
                            <td><Link to={`/juegos/${juego.id_juego}`}>{juego.nombre_juego}</Link></td>
                            <td>{juego.clasificacion_edad}</td>
                            <td>{juego.nombre_plataforma}</td>
                            <td>{juego.calificacion_promedio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Controles de paginación */}
            <div className="pagination-cotrols">
                <button onClick={handlePaginaAnterior} disabled={pagina === 1} className="pagination-button">
                    Anterior
                </button>
                <span className="pagination-info">Página {pagina}</span>
                <button onClick={handlePaginaSiguiente}
                    disabled={pagina >= Math.ceil(total / juegosPorPagina)}
                    className="pagination-button">
                    Siguiente
                </button>
            </div>

            {/* Muestra el mensaje de error, si existe */}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default JuegoPage;