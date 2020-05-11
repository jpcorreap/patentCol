# patentCol
Sitio web para ayudar a PyMEs e inventores independientes colombianos en el proceso de solicitud de patentes.

# Tecnologías usadas
Se utiliza un servidor de Express.js que ejecuta el backend en el puerto 3001. Se usa Mongo Atlas como base de datos. Para el frontend se usó React. La autenticación se realiza con Passport.js y Bcrypt.


# ¿Cómo ejecutar la aplicación?
Actualmente solo se puede ejecutar con la vista de servidor de desarrollo. Para ello siga los siguientes pasos. Note que debe tener yarn instalado en su computador y descargar mediante git clone este repositorio.

## Paso 1: instalar y ejecutar el backend:
Para correr el backend de la aplicación, ejecute los siguientes comandos:

`cd quedate-en-casa` <br />
`yarn`<br />
`yarn start`

## Paso 2: instalar y ejecutar el frontend:
El siguiente paso es ejecutar el front, construido con React. Para ello, ejecute:

`cd quedate-en-casa`<br />
`cd front`<br />
`yarn`<br />
`yarn start`

Una vez seguidos los pasos anteriores, podrá acceder a la aplicación hosteada en el http://localhost:3000.
