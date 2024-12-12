import mongoose from 'mongoose';

const Usuario = new mongoose.Schema({
    nombre: {
        required: true,
        type: String
    },
    apellido: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    correo: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    fechaNacimiento: {
        required: true,
        type: String
    },
    numeroTlf: {
        required: true,
        type: Number
    },
    quedadasCreadas: {
        type: [String]
    },
    quedadasAsistidas: {
        type: [String]
    },
    amigos: {
        type: [String]
    },
    seguidos: {
        type: [String]
    },
    seguidores: {
        type: [String]
    }

})


export default mongoose.model('Usuarios', Usuario);
