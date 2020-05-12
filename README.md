# Patent Col
Sitio web para ayudar a PyMEs e inventores independientes colombianos en el proceso de solicitud de patentes.

![Thumbnail de la aplicacion](https://github.com/jpcorreap/patentCol/blob/master/image.png?raw=true)

# Tecnologías usadas
Se utiliza un servidor de Express.js que corre sobre Node.js. Este es el backend en el puerto 3001. Se usa Mongo Atlas como base de datos y para el frontend se usó React, en el puerto 3000. La autenticación se realiza con Passport.js y se encriptan contraseñas con Bcrypt.

# Requerimientos 

**Node.js**

Se debe tener Node.js instalado, en caso de no poseerlo esta es la pagina web para descargarlo y ejecutar las instrucciones https://nodejs.org/es/download/


**MongoDB**

Como la aplicacion se va a correr de manera local se debe tener instalado MongoDB. Para instalarlo local, diríjase a la  siguiente pagina https://www.mongodb.com/download-center/community 

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

Una vez seguidos los pasos anteriores, podrá acceder a la aplicación en su http://localhost:3000.
