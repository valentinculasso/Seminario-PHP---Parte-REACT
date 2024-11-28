import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { setAuthHeader, checkSesion } from '../axiosConfig';
import PaginationButtonsComponent from '../../components/paginationButtonsComponent';
import '../../assets/styles/paginationButtonsComponent.css';
import '../styles/detalleJuego.css';

function DetalleJuego() {
    const { id } = useParams();
    const [pagina, setPagina] = useState(1);
    const [total, setTotal] = useState(0);
    const [listaAllCalificacion, setListaAllCalificacion] = useState([]);
    const [listaCalificacion, setListaCalificacion] = useState([]);
    const [juego, setJuego] = useState(null);
    const [errorJuego, setErrorJuego] = useState(null);
    const [errorCalificaciones, setErrorCalificaciones] = useState(null);

    useEffect(() => {
        fetchGame(id);
    }, [id]);

    useEffect(() => {
        listAllCalification();
        if (checkSesion()) {
            listCalificationUser();
        }
    }, [pagina]);

    useEffect(() => {
        if(checkSesion()){
            if (listaCalificacion.length > 0 && listaAllCalificacion.length > 0) {
                checkCalification();
            }
        }
    }, [listaAllCalificacion, listaCalificacion]);

    const checkCalification = () => {
        const calificacionesDestacadas = listaAllCalificacion.map((calificacion) => {
            const esDelUsuario = listaCalificacion.some((userCalificacion) =>
                userCalificacion.juego_id === calificacion.juego_id && userCalificacion.usuario_id === calificacion.usuario_id
            );
            return { ...calificacion, esDelUsuario }; 
        });
        if (JSON.stringify(calificacionesDestacadas) !== JSON.stringify(listaAllCalificacion)) {
            setListaAllCalificacion(calificacionesDestacadas);
        }
    };

    /*  
        id / estrellas / user_id / juego_id / esDelUsuario
        
        1       3           1          1         true
        2       5           2          2         false
        
    */

    const fetchGame = (id) => {
        api.get(`/juegos/${id}`)
            .then((response) => {
                setJuego(response.data);
                setErrorJuego(null);
            })
            .catch(() => {
                setErrorJuego("Hubo un problema al cargar los detalles del juego.");
            });
    };

    const listCalificationUser = () => {
        setAuthHeader();
        api.get('/calificaciones')
            .then((response) => {
                setListaCalificacion(response.data);
                setErrorCalificaciones(null);
            })
            .catch(() => {
                setErrorCalificaciones('No se pudieron cargar las calificaciones del usuario logeado.');
            });
    };

    const listAllCalification = () => {
        const queryParams = new URLSearchParams({
            id: id,
            pagina,
        });
        api.get(`/calificacionescompletas?${queryParams.toString()}`)
            .then((response) => {
                setListaAllCalificacion(response.data.result);
                setTotal(response.data.total);
                setErrorCalificaciones(null);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setListaAllCalificacion([]);
                    setTotal(0);
                    setErrorCalificaciones("No hay calificaciones para este juego.");
                } else {
                    setErrorCalificaciones('No se pudieron cargar las calificaciones.');
                }
            });
    };

    if (errorJuego) return <div className="detalle-juego-container error-message">{errorJuego}</div>;

    return (
        <div className="detalle-juego-container">
            {!juego ? (
                <div>No se encontraron detalles para este juego.</div>
            ) : (
                <>
                    <div className="detalle-juego-header">
                        <h2>{juego.nombre}</h2>
                    </div>

                    <ul className="detalle-juego-info">
                        <li>
                            <span className="detalle-juego-label">Nombre del juego:</span> {juego.nombre}
                        </li>
                        <li>
                            <span className="detalle-juego-label">ID del juego:</span> {juego.id}
                        </li>
                        <li>
                            <span className="detalle-juego-label">Descripcion:</span> {juego.descripcion}
                        </li>
                        <li>
                            <span className="detalle-juego-label">Imagen:</span>
                            {juego.imagen ? (
                                <img
                                    src={juego.imagen}
                                    alt={juego.nombre}
                                    className="detalle-juego-imagen"
                                />
                            ) : (
                                "No disponible"
                            )}
                        </li>
                        <li>
                            <span className="detalle-juego-label">Clasificacion por edad:</span> {juego.clasificacion_edad}
                        </li>
                        <li>
                            <span className="detalle-juego-label">Calificacion promedio:</span> {juego.calificacion_promedio}
                        </li>
                        <li>
                            <span className="detalle-juego-label">Lista de calificaciones:</span>
                            {errorCalificaciones ? (
                                <div className="error-message">{errorCalificaciones}</div>
                            ) : (
                                <>
                                    <table className="calificacion-table">
                                        <thead>
                                            <tr>
                                                <th>Id de la calificación</th>
                                                <th>Estrellas</th>
                                                <th>ID del usuario</th>
                                                <th>ID del juego</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listaAllCalificacion.length > 0 ? (
                                                listaAllCalificacion.map((calificacion) => (
                                                    <tr
                                                        key={calificacion.id}
                                                        className={calificacion.esDelUsuario ? "highlight-row" : ""}
                                                    >
                                                        <td>{calificacion.id}</td>
                                                        <td>{calificacion.estrellas}</td>
                                                        <td>{localStorage.getItem('username')}</td>
                                                        <td>{calificacion.juego_id}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="no-calificaciones">
                                                        No hay calificaciones para este juego.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    {/* Controles de paginación */}
                                    <PaginationButtonsComponent
                                        paginaActual={pagina}
                                        total={total}
                                        onPageChange={setPagina}
                                    />
                                </>
                            )}
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
}

export default DetalleJuego;


/*
    para evitar WARNINGS in [eslint] - "missing dependency 'listAllCalification'" podria usar useCallBack como en juegoPage

                                        missing dependency: 'checkCalification'

*/