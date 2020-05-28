# Patent Search
Sitio web para ayudar a en la busqueda de pantentes a travez de distintas bases de datos en el mundo.

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

# ¿Cómo ejecutar la aplicación localmente ?
Para ello siga los siguientes pasos. Note que debe tener yarn instalado en su computador.

## Paso 1: clonar el repo:
`git clone https://github.com/jpcorreap/patentCol.git` <br />

## Paso 2: Instalar y ejecutar el backend:
`cd patentSearch` <br />
`yarn`<br />
`yarn start`

## Paso 3:  instalar y ejecutar el frontend:
`cd patentSeacrh`<br />
`cd front`<br />
`yarn`<br />
`yarn start`


Una vez seguidos los pasos anteriores, podrá acceder a la aplicación en su http://localhost:3000.
