import mongoose from 'mongoose';

const Quedada = new mongoose.Schema({
    fecha: {
        required: true,
        type: String
    },
    hora: {
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
        required: true,
        type: String
    },
})

export default mongoose.model('Quedadas', Quedada);
