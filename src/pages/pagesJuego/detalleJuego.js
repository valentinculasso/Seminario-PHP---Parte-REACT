import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { setAuthHeader, checkSesion } from '../axiosConfig';
import './detalleJuego.css';

function DetalleJuego() {
    const { id } = useParams();
    //
    const [listaAllCalificacion, setListaAllCalificacion] = useState([]);
    const [listaCalificacion, setListaCalificacion] = useState([]);
    const [calificacionExistente, setCalificacionExistente] = useState(null); // Estado para la calificación destacada
    const [highlightedCalification, setHighlightedCalification] = useState(null); // Opcional para manejo visual
    //
    const [juego, setJuego] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGame(id);
        listAllCalification();
        {checkSesion &&
            listCalificationUser();
        }
    }, [id]); // DUDA: Creo que aca no iria una dependencia, ya que no tengo nada que me haga cambiar el id. No es que diga bueno si cambia mi id cambia mi pagina

    // Llama a esta función después de cargar las calificaciones y juegos:
    useEffect(() => {
        if (listaCalificacion.length > 0 && listaAllCalificacion.length > 0) {
            checkCalification();
        }
    }, [listaAllCalificacion, listaCalificacion]);

    const checkCalification = () => {
        // Encuentra las calificaciones que coinciden entre ambas listas
        const calificacionesDestacadas = listaAllCalificacion.map((calificacion) => {
            const esDelUsuario = listaCalificacion.some(
                (userCal) =>
                    userCal.juego_id === calificacion.juego_id &&
                    userCal.usuario_id === calificacion.usuario_id
            );
            return { ...calificacion, esDelUsuario };
        });
    
        // Actualiza la lista de calificaciones con la propiedad `esDelUsuario`
        if (JSON.stringify(calificacionesDestacadas) !== JSON.stringify(listaAllCalificacion)) {
            setListaAllCalificacion(calificacionesDestacadas);
        }
        const userCal = calificacionesDestacadas.find((cal) => cal.esDelUsuario);
        setCalificacionExistente(userCal || null);
        setHighlightedCalification(userCal || null); // Opcional para manejo visual
    };

    const fetchGame = (id) => {
        api.get(`/juegos/${id}`)
            .then((response) => {
                setJuego(response.data);
                console.log(response.data.imagen);
                setError(null);
            })
            .catch(() => {
                setError("Hubo un problema al cargar los detalles del juego.");
            })
    };

    // Espacio para hacer una funcion get -> esta funcion la deberian llamar handleSubmit y handleDelete 
    const listCalificationUser = () => {
        setAuthHeader();
        api.get('/calificaciones')
            .then((response) => {
                setListaCalificacion(response.data);
                setError(null);
            })
            .catch(() => {
                setError('No se pudieron cargar las calificaciones del usuario.');
            });
    }

    // Espacio para hacer una funcion get -> esta funcion la deberian llamar handleSubmit y handleDelete 
    const listAllCalification = () => {
        api.get(`/calificacionescompletas/${id}`)
            .then((response) => {
                setListaAllCalificacion(response.data);
                setError(null);
            })
            .catch(() => {
                setError('No se pudieron cargar las calificaciones del usuario.');
            });
    }

    if (error) return <div className="detalle-juego-container error-message">{error}</div>;

    if (!juego) return <div className="detalle-juego-container">No se encontraron detalles para este juego.</div>;

    return (
        <div className="detalle-juego-container">
            
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
                
                    <table className="calificacion-table">
                        <thead>
                            <tr>
                                <th>Id de la calificacion</th>
                                <th>Estrellas</th>
                                <th>ID del usuario</th>
                                <th>ID del juego</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaAllCalificacion.map((calificacion) => (
                                <tr key={calificacion.id}
                                    className={calificacion.esDelUsuario ? "highlight-row" : ""}
                                >
                                <td>{calificacion.id}</td>
                                <td>{calificacion.estrellas}</td>
                                <td>{calificacion.usuario_id}</td>
                                <td>{calificacion.juego_id}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>
    );
}

export default DetalleJuego;