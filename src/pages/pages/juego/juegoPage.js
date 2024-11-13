import React, { useEffect, useState, useCallback } from 'react';
import api from '../axiosConfig';
import { Link } from 'react-router-dom';
import './juegoPage.css';

function JuegoPage() {
    const [juegos, setJuegos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null);
    //
    const [texto, setTexto] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [clasificacion, setClasificacion] = useState('');
    const [filtros, setFiltros] = useState({ texto, plataforma, clasificacion }); // Creo un estado "filtros" para manejar los 3 juntos

    const juegosPorPagina = 5;

    // Define fetchGameData como una función con useCallback, React "memoriza" la funcion, de este modo no se vuelven a crear en cada renderizado, solo se crea si sus dependencias cambian
    const fetchGameData = useCallback(() => {

        // Para manejar los parametros mas facil uso URLSearchParams, creo una cadena de consulta queryParams con los parametros

        const queryParams = new URLSearchParams({
            pagina,
            texto: filtros.texto,
            plataforma: filtros.plataforma,
            clasificacion: filtros.clasificacion,
        });

        console.log(queryParams.toString());

        api.get(`/juegos?${queryParams.toString()}`)
            .then((response) => {
                setJuegos(response.data.result);
                setTotal(response.data.total);
                setError(null);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setError("No hay juegos que mostrar en esta página.");
                } else {
                    setError("Hubo un problema al cargar los juegos.");
                }
                setJuegos([]);
            });
        // Uso pagina y filtros como dependencias, si estas cambian react crea la funcion
    }, [pagina, filtros]);

    // useEffect para actualizar la página cuando cambian los filtros
    useEffect(() => {
        setPagina(1); // Si cambia un filtro (osea un usuario escribe un filtro) -> si el usuario estaba por ejemplo en la pagina 3 (sin filtros), cuando aplique un filtro 'pagina' vuelve a
                      // setearse en 1, si no mostraria la nueva pagina con el filtro aplicado con la pagina actual
        setFiltros({ texto, plataforma, clasificacion }); // Actualizo el estado de filtros
    }, [texto, plataforma, clasificacion]);

    // Llama a fetchGameData cada vez que los filtros o la página cambian
    useEffect(() => {
        fetchGameData();
    }, [fetchGameData]);

    // Función para avanzar a la siguiente página
    // Math.ceil = obtiene el número exacto de páginas necesarias para mostrar todos los elementos.
    // lo hace redondeando el resultado hacia arriba al número entero más cercano. (osea si da 2.5, toma como resultado el 3 entonces muestra 3 paginas)
    const handlePaginaSiguiente = () => {
        if (pagina < Math.ceil(total / juegosPorPagina)) {
            setPagina((prevPagina) => prevPagina + 1);
        }
    };

    const handlePaginaAnterior = () => {
        if (pagina > 1) {
            setPagina((prevPagina) => prevPagina - 1);
        }
    };

    return (
        <div className="juego-page">
            {/* Formulario de filtros */}
            <form className="filter-form">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Buscar por plataforma"
                    value={plataforma}
                    onChange={(e) => setPlataforma(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Clasificación (ATP, +13, +18)"
                    value={clasificacion}
                    onChange={(e) => setClasificacion(e.target.value)}
                />
            </form>

            {/* Tabla de juegos */}
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
            
            {/* Mensaje de error */}
            {error && <div className="error-message">{error}</div>}

            {/* Controles de paginación */}
            <div className="pagination-controls">
                <button onClick={handlePaginaAnterior} disabled={pagina === 1} className="pagination-button">
                    Anterior
                </button>
                <span className="pagination-info">Página {pagina}</span>
                <button
                    onClick={handlePaginaSiguiente}
                    disabled={pagina >= Math.ceil(total / juegosPorPagina)}
                    className="pagination-button"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default JuegoPage;