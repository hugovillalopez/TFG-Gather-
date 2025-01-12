import mongoose from 'mongoose';

const Quedada = new mongoose.Schema({
    nombre: {
        required: true,
        type: String
    },
    fecha: {
        required: true,
        type: String
    },
    horaInicio: {
        required: true,
        type: String
    },
    horaFin: {
        required: true,
        type: String
    },
    lugar: {
        required: true,
        type: String
    },
    usuario: {
        required: true,
        type: String
    },
    deporte: {
        required: true,
        type: String
    },
    valoracion: {
        type: String
    },
    visibilidad: {
        required: true,
        type: String
    },
    
    minAsistentes: {
        required: true,
        type: String
    },
    maxAsistentes: {
        required: true,
        type: String
    },
    usuariosAsistentes: {
        type: [String]
    },
    equipo: {
        type: [String]
    }
})

export default mongoose.model('Quedadas', Quedada);
