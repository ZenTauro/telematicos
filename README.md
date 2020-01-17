# Smart Room project
El proyecto se compone del frontend, el backend y la configuración del reverse proxy
estos se encuentran en el los directorios, frontend, python_back y nginx respectivamente.

Aun que el proyecto es funcional, todavía hace falta empaquetar en contenedores
las aplicaciones y escribir los archivos para kubernetes que definan las conexiones
entre contenedores.

# Arquitectura
La aplicación está compuesta por 4 partes esenciales:
 - El frontend
 - El backend
 - Servidor de Redis
 - Base de datos (Postgresql)

## Reverse proxy (Nginx)
Entre medias del frontend y el resto, se sitúa el reverse proxy nginx, el cual se encarga
de reenviar y balancear las conexiones a la api y de cachear y servir los archivos
estáticos.

## Backend
### Flask API y WebSockets
La aplicación flask corre sobre el servidor uWSGI, el cual escucha en el puerto TCP 36837
el protocolo WSGI y proporciona toda la lógica de conexión en tiempo real, autenticación,
gestión de usuarios e interacción con las habitaciones.

La comunicación en tiempo real se realiza mediante websockets, lo cual nos permite enviar
actualizaciones al cliente de forma inmediata sin que este tenga que pedirlos. Una de las
mayores ventajas obtenidas al usar este método es la reducción de ancho de banda y la
reducción de latencia.

Para interacciones que no precisan de una comunicación en tiempo real se ha desarrollado
una API REST. En esta API, se maneja todo lo relacionado con las sesiones y cuentas de
usuario.

### Redis
Para la gestión de sesiones se utiliza redis por su velocidad de respuesta y su capacidad
para poder tener varias instancias en distintos hosts.


# Construcción del proyecto
Para poder construir el proyecto necesitaremos las siguientes herramientas.
 - yarn
 - python
 - docker
 - google-chrome

## Frontend
En el directorio se ejecuta `yarn build`, lo cual gestionará todas las dependencias y
generará una carpeta llamada build.
