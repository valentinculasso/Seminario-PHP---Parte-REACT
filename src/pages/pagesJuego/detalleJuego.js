import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Este import es de axios para realizar solicitudes HTTP
import './juegoPage.css'; // Este import importa el archivo CSS para estilos

function JuegoPage() {
    // Defin los estados inicial para almacenar la lista de juegos y el número de página
    const [juegos, setJuegos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [error, setError] = useState(null); // Estado para manejar errores en la carga de datos

    // useEffect se ejecuta cada vez que 'pagina' cambia, llamando a fetchGameData
    useEffect(() => {
        fetchGameData(pagina);
    }, [pagina]);

    // Función para obtener los datos de los juegos desde el backend
    const fetchGameData = (pagina) => {
        // Realiza una solicitud GET a la API, pasando la página actual como parámetro
        axios.get(`http://localhost:8000/juegos?pagina=${pagina}`)
            .then((response) => {
                // Si la solicitud es exitosa, guarda los datos de los juegos en el estado
                setJuegos(response.data);
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
        setPagina((prevPagina) => prevPagina + 1); // Pagina + 1
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
                            <td><a href='http://localhost:3000'>{juego.nombre_juego}</a></td>
                            <td>{juego.clasificacion_edad}</td>
                            <td>{juego.nombre_plataforma}</td>
                            <td>{juego.calificacion_promedio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Controles de paginación */}
            <div className="pagination-controls">
                <button onClick={handlePaginaAnterior} disabled={pagina === 1} className="pagination-button">
                    Anterior
                </button>
                <span className="pagination-info">Página {pagina}</span>
                <button onClick={handlePaginaSiguiente}/* aca deberia poner una condicion para que si en la siguiente pagina no hay nada no deje ir? como arriba si llega a la pagina 1
                 */ className="pagination-button">
                    Siguiente
                </button>
            </div>

            {/* Muestra el mensaje de error, si existe */}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default JuegoPage;