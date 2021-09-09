'use strict'

var Cliente = require('../models/cliente'); //Nuestro modelo cliente va a estar inicializado en esta variable cliente
var bcrypt = require('bcrypt-nodejs'); //Llamamos al paquete instalado al inicio para encriptar contraseñas
var jwt = require('../Helpers/jwt') //Para el token de cada usuario


const registro_cliente = async function (req,res) {

    var data =req.body; //Toda la data enviada estara en el cuerpo del request
    
    //Verificar si un correo en la bd ya esta registrado
    var clientes_arr = []; 

    clientes_arr = await Cliente.find({email:data.email});

    //Si el arreglo esta vacio , significa que no hay correos iguales , entonces se procedera a registrar el usuario
    if(clientes_arr.length == 0){
        //Si hay una contraseña:
        if(data.password){
            bcrypt.hash(data.password, null, null , async function(err,hash ){
                //Si hash contiene la contraseña encriptada
                if(hash){
                    //Actualizo la contraseña
                    data.password = hash;
                    //Registro del usuario
                    var reg = await Cliente.create(data);
                    res.status(200).send({data: reg});
                }else{
                    res.status(200).send({message: 'ErrorServer', data:undefined});
                }
            })
        }else{
            res.status(200).send({message: 'No hay una contraseña', data:undefined});
        }

    }else{
        res.status(200).send({message: 'El correo ya existe en la base de datos', data:undefined});
    }
}

const login_cliente = async function (req, res){
    var data = req.body;
    var cliente_arr = [];

    //Busca el correo del cliente en toda la data para ver si el usuario existe
    cliente_arr = await Cliente.find({email:data.email});
    if(cliente_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data:undefined});
    }else{
        //Usuario dentro de la base de datos
        let user = cliente_arr[0];
        
        bcrypt.compare(data.password, user.password, async function (err,check){
            //Verificando la contraseña
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'La contraseña es incorrecta', data:undefined})
                }
        });
    }
}

module.exports ={
    registro_cliente,
    login_cliente
}