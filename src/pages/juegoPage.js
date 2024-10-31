import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JuegoPage(){

    const [juegos, setJuegos] = useState();

    useEffect(() => {
        console.log("Hola");
        fetchGameData();
    },[])

    const fetchGameData = () => {
        // Make a request for a user with a given ID
        axios.get('http://localhost:8000/juegos?pagina=1')
        .then(function (response) {
        // handle success
        setJuegos(response.data);
        console.log(response);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });

     }

    return(
        <div>{
            // iterar el estado (que es un array) -> con while, con for, etc
            
            /*juegos.map(() => (
                
            )*/

            }</div>
    );
}

export default JuegoPage;