# delilahResto

Delilah Resto es mi tercer proyecto como estudiante de Acámica, creando el backend para un delivery de comidas.

## Recursos y Tecnologías utilizadas

* Node.js
* Express
* JWT para autenticación vía Bearer Token
* MySQL
* Sequelize
* Postman para testeo de los endpoints
* Swagger para documentación de la API

El objetivo del trabajo es generar la arquitectura, base de datos relacionales, endpoints y documentacion para la app de pedidos de comida

## Documentación

Abrir el archivo `swaggerdoc.yaml` y pegar su contenido en [Swagger](https://editor.swagger.io/ "Swagger Editor") o importarlo desde la misma página. Se listarán los endpoints y funciones disponibles, además de la información necesaria para el uso de los mismos.

## Instalación del proyecto

1. Clonar el proyecto desde [este link](https://github.com/julianchape/delilahResto "GitHub repository - Delilah Resto") o desde la consola con el siguiente comando: `https://github.com/julianchape/delilahResto.git`.
2. Instalar las dependencias necesarias usando `npm install`

### Creación de la base de datos
+ Abrir XAMPP, inicializar los servicios Apache y MySQL. Asegurarse de que MySQL se esté ejecutando en el puerto 3306
- entrar a PHPMyAdmin, localhost/phpmyadmin.
+ Importar el archivo `delilahresto.sql` o en su defecto, abrir el archivo, copiar la serie de queries, crear la base de datos manualmente y luego ejecutar manualmente las queries.

### Iniciar la API
Para esto hay que ejecutar el archivo `index.js` ubicado en la raíz del proyecto con node, usando ```node index.js```

## Listo para usar!
Una vez realizados todos los pasos previos, la API ya esta escuchando y preparada para recibir y enviar las queries realizadas por el usuario en los distintos endpoints. Para ingresar a los distintos endpoints se puede utilizar Postman y seguir los pasos sugeridos en [Documentación](#Documentación)
