'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    direccion: {type: String, required: false}, //A eliminar
    email: {type: String, required: true},
    password: {type: String, required: true},
    perfil: {type: String, default: 'perfil.png', required: false},
    telefono: {type: String, required: false},
    dni: {type: String, required: true},
    distrito: {type: String, required: false},
});

module.exports = mongoose.model('cliente',ClienteSchema);