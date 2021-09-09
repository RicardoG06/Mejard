'use strict'

var express = require('express');
var app = express(); //Ya que traje express , lo inicializo
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4202;

//var admin_route = require('./routes/admin')
var cliente_route = require('./routes/cliente');

//Conectar con la bd de datos dentro de Robo 3T el cual conecta con moongose , useunified y useurl es para quitar las alertas de de consola
mongoose.connect('mongodb://127.0.0.1:27017/Mejard',{useUnifiedTopology: true , useNewUrlParser: true},(err,res)=>{
    if(err){ //Si  hay un error de coneccion , me imprime el error
        console.log(err)
    }else{
        app.listen(port,function(){
            console.log('Servidor corriendo en el puerto' + port);
        })
    }
});

//Cuando se envia info del front al back del usuario , se debe parsear la data:
// urlencoded -> Obtener los datos del cliente en JSON 
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb', extended:true}));

// //Para una conexion estable, al estar el back y el front en diferentes puertos y servidores
app.use((req,res,next)=>{
     res.header('Access-Control-Allow-Origin','*'); 
     res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
     res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
     res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
     next();
 });

// //Inicializando las rutas
app.use('/api',cliente_route);
// app.use('/api',admin_route);

module.exports = app;