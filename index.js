//DECLARACIONES
const sequelize = require('./conexion.js');
const express = require ('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const expressJwt = require("express-jwt")
const app = express();
const port = 3000;
var esAdmin=require('./authorization.js');
const { response } = require('express');
var jwtpw = "ff13.chape"


//INICIALIZACIONES
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('publica'));
app.use(expressJwt({ secret: jwtpw, algorithms: ['HS256']  }).unless({ path: ["/users","/users/login"] }));


//QUERIES
function login(req,res){
    var data=req.body;
    sequelize.query('SELECT * FROM users WHERE username=? AND password=?',
        {
            replacements: [data.username,data.password], type: sequelize.QueryTypes.SELECT
        })
        .then(function (resultado){
            if(resultado[0].username == data.username && resultado[0].password == data.password){
                var token = jwt.sign({
                    username:resultado[0].username,
                    password:resultado[0].password,
                    rol:resultado[0].roleId
                },jwtpw);
                res.send("Tu token de login es: "+token)
            }
        })
        .catch(function(){
            res.status(403).send("No existe ese usuario o contraseña")
        })
}

function addItem(request,response){
    data=request.body;

    sequelize.query('INSERT INTO items (name,stock,valor) VALUES (?,?,?)', {
        replacements: [data.nombre,data.stock,data.valor]
    }).then(function(){
        response.status(200).send("El producto fue creado exitosamente")
    }).catch(function(){
        response.status(403).send("El producto no fue creado")
    })

    /* var data=request.body;
    sequelize.query('SELECT * FROM users WHERE username=? AND password=?',
        {
            replacements: [data.username,data.password], type: sequelize.QueryTypes.SELECT
        })
        .then(function(resultado){
            if(resultado[0].roleId==2){
                console.log("El usuario "+resultado[0].username+" es administrador");
                sequelize.query('INSERT INTO items (name,stock,valor) VALUES (?,?,?)', {
                    replacements: [data.nombre,data.stock,data.valor]
                }).then(function(){
                    response.status(200).send("El producto fue creado exitosamente")
                }).catch(function(){
                    response.status(403).send("El producto no fue creado")
                })
            }else{
                response.status(403).send("El usuario no tiene permiso para realizar esta operacion");
            }
        }).catch(function(){
            response.status(403).send("El usuario no existe");
        }) */
}

function readAllItems(request,response){
    var data=request.body;
    sequelize.query('SELECT * FROM users WHERE username=? AND password=?',
        {
            replacements: [data.username,data.password], type: sequelize.QueryTypes.SELECT
        })
        .then(async function(resultado){
            if(resultado[0].roleId==2){
                console.log("El usuario "+resultado[0].username+" es administrador");
                await sequelize.query('SELECT * FROM items',
                {type: sequelize.QueryTypes.SELECT})
                .then(function(items){
                    response.status(200).send(items)
                }).catch(function(){
                    response.status(403).send("No se pudo leer lista de productos")
                })
            }else{
                await sequelize.query('SELECT * FROM items WHERE items.active = 1',
                {type: sequelize.QueryTypes.SELECT})
                .then(function(activeItems){
                    response.status(200).send(activeItems)
                }).catch(function(){
                    response.status(403).send("No se pudo leer lista de productos")
        })}})
        .catch(function(){
    response.status(403).send("El usuario no existe");
})
}

function readItem(request,response){
    var data=request.body;
    var item=request.params;
    sequelize.query('SELECT * FROM users WHERE username=? AND password=?',
        {
            replacements: [data.username,data.password], type: sequelize.QueryTypes.SELECT
        })
        .then(async function(resultado){
            if(resultado[0].roleId==2){
                console.log("El usuario "+resultado[0].username+" es administrador");
                await sequelize.query('SELECT * FROM items WHERE items.id = ?',
                {replacements: [item.id], type: sequelize.QueryTypes.SELECT})
                .then(function(producto){
                    response.status(200).send(producto)
                }).catch(function(){
                    response.status(403).send("No se pudo leer lista de productos")
                })
            }else{
                await sequelize.query('SELECT * FROM items WHERE items.id = ? AND items.active = 1',
                {replacements:[item.id], type: sequelize.QueryTypes.SELECT})
                .then(function(activeItem){
                    response.status(200).send(activeItem)
                }).catch(function(){
                    response.status(403).send("No se pudo leer lista de productos")
        })}})
        .catch(function(){
    response.status(403).send("El usuario no existe");
})
}

function updateItem(request,response){
    var data=request.body;
    sequelize.query('SELECT * FROM users WHERE username=? AND password=?',
        {
            replacements: [data.username,data.password], type: sequelize.QueryTypes.SELECT
        })
        .then(function(resultado){
            if(resultado[0].roleId==2){
                sequelize.query('UPDATE items SET name = ?, active = ?, stock = ?, valor = ? WHERE id=?', {
                    replacements: [data.nombre,data.estado,data.stock,data.precio, data.id]
                }).then(function(){
                    response.status(200).send("El producto fue actualizado exitosamente")
                }).catch(function(){
                    response.status(403).send("El producto no fue actualizado")
                })
            }else{
                response.status(403).send("El usuario no tiene permiso para realizar esta operacion");
            }
        }).catch(function(){
            response.status(403).send("El usuario no existe");
        })
}

function addUser(request,response){
    data=request.body;

    if(!data.rol){
        sequelize.query('INSERT INTO users (username, fullname, email, phone, adress, password) VALUES (?,?,?,?,?,?)', {
            replacements: [data.username,data.nombre,data.email,data.telefono,data.direccion,data.contraseña]
        }).then(function(){
            response.status(200).send("El usuario fue creado exitosamente")
        }).catch(function(){
            response.status(403).send("El usuario no fue creado, por favor revisar los datos ingresados")
        })
    }else{
        sequelize.query('INSERT INTO users (username, fullname, email, phone, adress, password, roleId) VALUES (?,?,?,?,?,?,?)', {
            replacements: [data.username,data.nombre,data.email,data.telefono,data.direccion,data.contraseña,data.rol]
        }).then(function(){
            response.status(200).send("El usuario fue creado exitosamente")
        }).catch(function(){
            response.status(403).send("El usuario no fue creado, por favor revisar los datos ingresados")
        })
    }
    
}

function addOrder(request,response){
    data=request.body;

    sequelize.query('INSERT INTO pedidos (userId,,payId) VALUES (?,?)', {
        replacements: [data.username,data.pago]
    }).then(function(){
        response.status(200).send("El pedido fue creado exitosamente")
    }).catch(function(){
        response.status(403).send("El pedido no fue creado, por favor revisar los datos ingresados")
    })
}






//ENDPOINTS
app.post('/users',addUser);
app.post('/users/login',login)
app.post('/productos',esAdmin,addItem);
app.get('/productos',readAllItems);
app.get('/productos/:id',readItem);
app.put('/productos',updateItem);


//RUN SERVER
app.listen(port, () => { console.log(`Server listeting on port ${port}`) });