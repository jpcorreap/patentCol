# patentCol
Sitio web para ayudar a PyMEs e inventores independientes colombianos en el proceso de solicitud de patentes.

# Tecnologías usadas
Se utiliza un servidor de Express.js que ejecuta el backend en el puerto 3001. Se usa Mongo Atlas como base de datos. Para el frontend se usó React. La autenticación se realiza con Passport.js y Bcrypt.

# Requerimientos 

**Node.js**

Se debe tener Node.js instalado, en caso de no poseerlo esta es la pagina web para descargarlo y ejecutar las instrucciones https://nodejs.org/es/download/

**MongoDB**

Como la aplicacion se va a correr de manera local se debe tener instalado mongoDB para instalarlo se puede ir a la  siguiente pagina https://www.mongodb.com/download-center/community 

Despues de tenerlo instalado ejecutar :

`mongod`

# ¿Cómo ejecutar la aplicación?
Actualmente se puede ejecutar con la vista de servidor de desarrollo y produccion. Para ello siga los siguientes pasos. Note que debe tener yarn instalado en su computador y descargar mediante git clone este repositorio.

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
