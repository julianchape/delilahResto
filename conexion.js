const Sequelize = require('sequelize'); 

const path = 'mysql://root@localhost:3306/delilahResto'; 

const sequelize = new Sequelize(path); 

sequelize.authenticate().then(() => { 
     console.log('Conectado.'); 
}) 
.catch(err => { console.error('Error de conexion:', err); }) 

module.exports = sequelize;