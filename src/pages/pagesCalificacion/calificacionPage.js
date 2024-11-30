import React, { useState , useEffect} from 'react';
import api, { setAuthHeader } from '../axiosConfig';
import '../styles/calificacionPage.css';

function CalificacionPage() {
    const [juegoID, setJuegoID] = useState('');
    const [estrellas, setEstrellas] = useState(0);
    const [calificacionExistente, setCalificacionExistente] = useState(null);
    const [listaCalificacion, setListaCalificacion] = useState([]);
    const [calificacionActual, setCalificacionActual] = useState(0);
    //
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        listCalification();
        const storedID = localStorage.getItem('juegoPage_id');
        if (storedID) {
            setJuegoID(storedID);
        }
    }, []);

    useEffect(() => {
        if (juegoID) {
            const calificacionExistente = listaCalificacion.find((calificacion) => calificacion.juego_id === juegoID);
            setCalificacionExistente(calificacionExistente);
            console.log(calificacionExistente);
            if(calificacionExistente){
                const calificacionAct = listaCalificacion.map((calificacion) => {
                    if(calificacion.juegoID === juegoID){
                        return(calificacion.estrellas);
                    }
                });
                console.log(calificacionAct);
                if(calificacionAct){
                    setCalificacionActual(calificacionAct);
                }
            }
            setError(null);
        }
    }, [listaCalificacion, juegoID]); // Aca el juegoID seria absurdo porque si estoy en la pagina de calificacion en teoria nunca va a cambiar

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthHeader();
        if ( !juegoID || estrellas < 1 || estrellas > 5) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }
        
        const request = calificacionExistente
            ? api.put(`/calificacion/${calificacionExistente.id}`, { juego_id: juegoID, estrellas: estrellas })
            : api.post('/calificacion', { juego_id: juegoID, estrellas: estrellas });

        request
            .then(() => {
                setSuccessMessage('Calificación enviada correctamente!');
                setError(null);
                setEstrellas(0);
                listCalification();
            })
            .catch(() => {
                setError('Hubo un error al enviar la calificación.');
                setJuegoID('');
                setEstrellas(0);
                setSuccessMessage('');
            });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        setAuthHeader();
        const calificacionID = calificacionExistente.id;
        api.delete(`/calificacion/${calificacionID}`)
            .then(() => {
                setEstrellas(0);
                setSuccessMessage('Calificación eliminada correctamente!');
                setCalificacionExistente(null);
                setError(null);
                listCalification();
            })
            .catch(() => {
                setError('No se pudo eliminar la calificación.');
                setJuegoID('');
                setEstrellas(0);
                setSuccessMessage('');
            });
    };
    

    return (
        <div className="calificacion-page">
            <h1 className="titulo">Calificar Juego</h1>
            
            {/* Mostrar mensaje de éxito o error */}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}

            {/* Formulario de calificación */}
            <form onSubmit={handleSubmit} className="calificacion-form">           
                <div>
                    <h3>Puntaje actual: {calificacionActual}</h3>
                    <h3>Ingrese la calificacion: (1-5 Estrellas):</h3>
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

export default CalificacionPage;