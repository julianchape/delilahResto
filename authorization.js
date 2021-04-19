const jwt = require('jsonwebtoken');
const esAdmin = function validateAdmin(req, res, next) {
     const decoded = req.headers.authorization.split(" ")[1];
      console.log(decoded);
      const decodificado = jwt.verify(decoded,'ff13.chape')
      console.log(decodificado)
      if(decodificado.rol !=2){
          res.status(403).json({error:"no estas autorizado"})
      }
       next();
     }
     
     
module.exports = esAdmin 