import mongoose from 'mongoose';

const Usuario = new mongoose.Schema({
    nombre: {
        required: true,
        type: String,
        match: [/^[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñü]+( [A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñü]+)*$/, "Error de validacion en: NOMBRE"]
    },
    apellido: {
        required: true,
        type: String,
        match: [/^[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñü]+( [A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñü]+)*$/, "Error de validacion en: APELLIDO"]
    },
    username: {
        required: true,
        type: String,
        match: [/^[A-Za-z]{1}[A-Za-z0-9_]+$/, "Error de validacion en: USERNAME"]
    },
    correo: {
        required: true,
        type: String,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Error de validacion en: CORREO"]
    },
    password: {
        required: true,
        type: String,
        
    },
    fechaNacimiento: {
        required: true,
        type: Date,
        validate: { 
            validator: function(value) { 
                const hoy = new Date(); 
                const hace15Anios = new Date(hoy.getFullYear() - 15, hoy.getMonth(), hoy.getDate()); 
                const hace100Anios = new Date(hoy.getFullYear() - 100, hoy.getMonth(), hoy.getDate()); 
                return value <= hace15Anios && value >= hace100Anios; 
            }, 
            message: 'La fecha de nacimiento debe ser entre hace 15 y 100 años.' }
    },
    numeroTlf: {
        required: true,
        type: Number,
        match: [/^[6|7]{1}[0-9]{8}$/, "Error de validacion en: NUMERO DE TELEFONO"]
    },
    foto:{
        type: String,
    },
    quedadasCreadas: {
        type: [String]
    },
    quedadasAsistidas: {
        type: [String]
    },
    seguidos: {
        type: [String]
    },
    seguidores: {
        type: [String]
    },
    equipos: {
        type: [String]
    },
    equipos: {
        type: [String]
    },
    solicitudes: {
        type: [String]
    },

})


export default mongoose.model('Usuarios', Usuario);
