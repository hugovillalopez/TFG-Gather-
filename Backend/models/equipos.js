import mongoose from 'mongoose';

const Equipo = mongoose.Schema({
    nombre: {
        required: true,
        type: String
    },
    creador: {
        required: true,
        type: String
    },
    admins: {
        type: [String]
    },
    miembros: {
        type: [String]
    },
    solicitudes: {
        type: [String]
    },
    quedadasEquipo: {
        type: [String]
    },
    foto: {
        type: String
    }
})

export default mongoose.model('Equipos', Equipo);