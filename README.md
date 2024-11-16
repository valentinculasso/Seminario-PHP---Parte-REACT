# Seminario-PHP---Parte-REACT
Proyecto seminario de PHP - Parte 2 React

ultimas cosas: 

Detalle juego lista de calificaciones:
	endpoint nuevo de calificacion -- me debe traer todas las calificaciones - HECHO

	cuando muestre el listado de calificaciones debo usar la lista de calificaciones del usuario logeado y resaltarlas
	pd: si no esta logeado solo muestra el listado de calificaciones "global" - HECHO (AUNQUE FALTA DE QUE SI NO ESTA LOGEADO MUESTRE SOLO LA LISTA DE CALIFICACIONES)

	los botones de anterior y siguiente deberian ser una componente reutilizable ya que pueden usarse en dos tablas - FALTA HACER

	la tabla tambien deberia ser una componente reutilizable ? VER / FALTA HACER

JuegoPage y CalificacionPage (boton calificar): HECHO
	la paginacion de juegos deberia tener un boton para cada juego llamado "calificar juego" el cual me redirige a calificar ya llevando el id del juego -> de este modo puedo poner el nombre del juego

altaJuego y soporteJuego: CHEQUEADO (Podria hacerlo de la manera que maneje el boton de calificar en juegoPage, pero prefiero dejarlo con navigate)
	al dar de alta, osea seleccionar "agregar juego" este boton deberia ser un link, y ademas al hacerle click deberia ejecutar el post
	obs: al parecer no se puede o se implementa de otra forma, en el handleSubmit uso navigate para redirigir. Usando link me redirige pero no se ejecuta el HandleSubmit

CHEQUEAR ESTO!!!! (osea podria implementarlo de cuando creo un juego/soporte hago un removeItem, cuando califico es distinto porq si seguis en la pagina necesitas seguir teniendo el id)
obs: cuando doy de alta un juego o selecciono "calificar!" estas acciones me guardan en localStorage el id del juego creado o seleccionado respectivamente, entonces cuando califico o creo un soporte deberia limpiar el localstorage

