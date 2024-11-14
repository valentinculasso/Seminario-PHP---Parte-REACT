import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import { setAuthHeader} from '../axiosConfig';
import './calificacionForm.css';

function CalificacionForm({ juegos }) {
    const [juegoID, setJuegoID] = useState('');
    const [estrellas, setEstrellas] = useState(0);
    const [calificacionID, setCalificacionID] = useState(null);
    const [calificacionExistente, setCalificacionExistente] = useState(null);
    const [listaCalificacion, setListaCalificacion] = useState([]);
    //
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Espacio para hacer una funcion get -> esta funcion la deberian llamar handleSubmit y handleDelete 
    const listCalification = () => {
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
    // Enviar calificacion // Editar calificacion
    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthHeader();
        if (juegoID === '' || estrellas < 1 || estrellas > 5) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }
        if(calificacionExistente){
            setCalificacionID(calificacionExistente.id);
        }
        const request = calificacionExistente
            ? api.put(`/calificacion/${calificacionID}`, { juego_id: juegoID, estrellas: estrellas })
            : api.post('/calificacion', { juego_id: juegoID, estrellas: estrellas });

        request
            .then(() => {
                setSuccessMessage('Calificación enviada correctamente!');
                setError(null);
                setJuegoID('');
                setEstrellas(0);
                listCalification(); // Se ejecuta el get (actualiza la lista de calificaciones)
            })
            .catch(() => {
                setError('Hubo un error al enviar la calificación.');
                setJuegoID('');
                setEstrellas(0);
                setSuccessMessage('');
            });
    };

    // Eliminar calificacion
    const handleDelete = (e) => {
        e.preventDefault();
        setAuthHeader();
        const calificacionID = calificacionExistente.id;
        api.delete(`/calificacion/${calificacionID}`)
            .then(() => {
                setJuegoID('');
                setEstrellas(0);
                setSuccessMessage('Calificación eliminada correctamente!');
                setCalificacionExistente(null);
                setError(null);
                listCalification(); // Se ejecuta el get (actualiza la lista de calificaciones)
            })
            .catch(() => {
                setError('No se pudo eliminar la calificación.');
                setJuegoID('');
                setEstrellas(0);
                setSuccessMessage('');
            });
    };
    useEffect(() => {
        if (juegoID) {
            const calificacionExistente = listaCalificacion.find((calificacion) => calificacion.juego_id === juegoID);
            setCalificacionExistente(calificacionExistente);
            setError(null);
        }
    }, [listaCalificacion, juegoID]);

    return (
        <div className="calificacion-page">
            <h2>Calificar Juego</h2>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="calificacion-form">
                <div>
                    <label>Seleccionar juego:</label>
                    <select
                        value={juegoID}
                        onChange={(e) => setJuegoID(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un juego</option>
                        {juegos.map((juego) => (
                            <option key={juego.id_juego} value={juego.id_juego}>
                                {juego.nombre_juego}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Estrellas (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={estrellas}
                        onChange={(e) => setEstrellas(e.target.value)}
                        required
                    />
                </div>
                {calificacionExistente ? (
                    <>
                        <button type="submit">Editar Calificación</button>
                        <button type="button" onClick={handleDelete}>Eliminar Calificación</button>
                    </>
                ) : (
                    <button type="submit">Enviar Calificación</button>
                )}
            </form>
        </div>
    );
}
export default CalificacionForm;