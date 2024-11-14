import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axiosConfig';
import './detalleJuego.css';

function DetalleJuego() {
    const { id } = useParams();
    const [juego, setJuego] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGame(id);
    }, [id]);

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
            </ul>
        </div>
    );
}

export default DetalleJuego;