const mongoose = require('mongoose');

const Usuario = new mongoose.Schema({
    nombre: {
        required: true,
        type: String
    },
    edad: {
        required: true,
        type: Number
    },
    correo: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: Number
    },
})

module.exports = mongoose.model('Usuarios', Usuario)