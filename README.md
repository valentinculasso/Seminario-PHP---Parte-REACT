# Seminario-PHP---Parte-REACT
Proyecto seminario de PHP - Parte 2 React

Cambios:

usuarioController -> login() -> devuelvo ademas del token, el vencimiento del token - SOLUCIONADO

	obs: el token en la base me toma otra zona horaria (+5 hs) - SOLUCIONADO: 
		$fecha->setTimezone(new DateTimeZone('America/Argentina/Buenos_Aires'));

	preguntas: el token deberia guardar el vencimiento o la fecha en el que fue creado?
		   si guardo el vencimiento ahi en el react podria hacer decode base 64 y json decode
		   y asi obtener los campos del token? De este modo mi endpoint no retornaria tantas cosas
		   y ademas usaria todo con el token
		   pd: al final en el token guarde el vencimiento y trabajo siempre con el token osea mi endpoint de login solamente devuelve el token y nada mas

	acomodar if en create user y edit user no solo para menos lineas de codigo sino tambien para
	una mejor legibilidad - SOLUCIONADO

juegoPageComponent -> Si el usuario esta logeado puede calificar juegos, si ya califico algunos de esos juegos
debe poder editar la calificacion o eliminarla
	- deberia crear un endpoint getCalificaciones, de este modo se cuales calificaciones tiene HECHO
	- Mi formulario de calificacion deberia ser dinamico, es decir si selecciona un juego si ese
	juego tiene calificaciones ya no tengo boton de crear calificacion, si no de editar o eliminar 	calificacion HECHO

	- Ver si al buscar por plataforma esta bien y si pone +18 deberian aparecer todas no solo las +18
		SOLUCIONADO

PREGUNTAS:

altaJuego -> codificar imagen a base 64 - ademas, al dar de alta un juego debe elegir una o mas plataformas, la pregunta es si como yo lo hice esta bien o solo tiene que estar en un formulario
solamente
detalleJuego -> mostrar imagen -> NO MUESTRA LA IMAGEN
             -> debe traer una lista de calificaciones de dicho juego (lo que me hace mas ruido es sobre como destacar si el usuario esta logeado)

al asignar soporte deberia desplegarme las opciones con los soportes disponibles
deberia poder asignarle mas de un soporte a cada juego ? -> por ejemplo que pueda seleccionar varios ***

components -> FormComponent -> inicio de sesion y registrarse tienen el mismo formulario
	VER no me quedo muy claro
