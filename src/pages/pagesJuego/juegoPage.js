import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { checkSesion } from '../axiosConfig';
import PaginationButtonsComponent from '../../components/paginationButtonsComponent';
import '../styles/juegoPage.css';

function JuegoPage() {
    const [juegos, setJuegos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null);
    //
    const [texto, setTexto] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [clasificacion, setClasificacion] = useState('');


    useEffect(() => {
        setPagina(1);
    }, [texto, plataforma, clasificacion]);

    const fetchGameData = useCallback(() => {
        const queryParams = new URLSearchParams({
            pagina,
            texto: texto,
            plataforma: plataforma,
            clasificacion: clasificacion,
        });
        api.get(`/juegos?${queryParams.toString()}`)
            .then((response) => {
                setJuegos(response.data.result);
                setTotal(Number(response.data.total));
                setError(null);
            })
            .catch((error) => {
                (error.response && error.response.status === 404)
                    ? setError("No hay juegos que mostrar en esta página.")
                    : setError("Hubo un problema al cargar los juegos.");
                setJuegos([]);
            });
    }, [pagina, texto, plataforma, clasificacion]);

    useEffect(() => {
        fetchGameData();
    }, [fetchGameData]);

    const handleButton = (juego_id) => {
        localStorage.setItem('juegoPage_id', juego_id);
        console.log('ID almacenado en localstorage en juegoPage: ',juego_id);
    }

    return (
        <div className="juego-page">
            {/* Formulario de filtros */}
            <form className="filter-form">
                <input type="text" placeholder="Buscar por nombre" value={texto} onChange={(e) => setTexto(e.target.value)}/>
                <input type="text" placeholder="Buscar por plataforma" value={plataforma} onChange={(e) => setPlataforma(e.target.value)}/>
                <input type="text" placeholder="Clasificación (ATP, +13, +18)" value={clasificacion} onChange={(e) => setClasificacion(e.target.value)}/>
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
                        {checkSesion() &&
                            <th>Calificar!</th>
                        }
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
                            {checkSesion() &&
                                <td><Link to={'/calificacion'}><button type="button" onClick={() => handleButton(juego.id_juego)}>Calificar!</button></Link></td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Mensaje de error */}
            {error && <div className="error-message">{error}</div>}

            {/* Controles de paginación */}
            <PaginationButtonsComponent
                paginaActual={pagina}
                total={total}
                onPageChange={setPagina}
            />
        </div>
    );
}

export default JuegoPage;