import express from 'express'

const router = express.Router()


import Quedada from '../models/quedadas.js'
import Usuario from '../models/usuarios.js'
import mongoose from 'mongoose';
import { conseguirEstado} from '../funciones.js';

export default router;

//Post Method
router.post('/postQuedada', async (req, res) => {
   const quedada = new Quedada({
    nombre: req.body.nombre,
    fecha:req.body.fecha,
    horaInicio:req.body.horaInicio,
    horaFin:req.body.horaFin,
    lugar:req.body.lugar,
    usuario:req.body.usuario,
    deporte:req.body.deporte,
    valoracion:req.body.valoracion || "",
    visibilidad:req.body.visibilidad,
    minAsistentes: req.body.minAsistentes,
    maxAsistentes: req.body.maxAsistentes,
    usuariosAsistentes: req.body.usuariosAsistentes || [],
    equipo: req.body.equipos || []
   })
   try {
        const quedadaToSave = await quedada.save();
        const user = await Usuario.findById(req.body.usuario)
        user.quedadasCreadas.push(quedadaToSave._id)
        await user.save()
        res.status(200).json(quedadaToSave)
   } catch (error) {
        res.status(400).json({message: error.message+ "ERROR"})
   }
})

//Get all Method
router.get('/quedadasUsuarios', async (req, res) => {
        try {
            const quedadas = await Quedada.find();
            const listaFiltrada = quedadas.filter((quedada) => quedada.equipo.length == 0 || !quedada.equipo)
            const quedadasConUsuarios = await Promise.all(
                listaFiltrada.map(async (quedada) =>{
                    const user = await Usuario.findById(quedada.usuario).select('_id username foto')
                    const estado = conseguirEstado(quedada.fecha,quedada.horaInicio,quedada.horaFin)
                    return {...quedada.toObject(), user, estado }
                
                })
            )
            
            
            res.status(200).json(quedadasConUsuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
})

router.get('/quedadas', async (req, res) => {
    try {
        const quedadas = await Quedada.find();
        const listaFiltrada = quedadas.filter((quedada) => quedada.equipo.length == 0 || !quedada.equipo)
        const quedadasConEstado = await Promise.all(
            listaFiltrada.map((quedada) =>{
                const estado = conseguirEstado(quedada.fecha,quedada.horaInicio,quedada.horaFin)
                return {...quedada.toObject(), estado }
            
            })
        )
        res.status(200).json(quedadasConEstado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Get by ID Method
router.get('/quedadaId/:id', async (req, res) => {
    try { 
        const quedada = await Quedada.findById(req.params.id); 
        const estado = conseguirEstado(quedada.fecha,quedada.horaInicio,quedada.horaFin)
        const quedadaEstado = {...quedada.toObject(), estado}
        res.status(200).json(quedadaEstado); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})
router.post('/quedada/', async (req, res) => {
    try { 
        const quedada = await Quedada.findById(req.body.id); 
        const user = await Usuario.findById(quedada.usuario).select('_id username foto')
        const estado = conseguirEstado(quedada.fecha,quedada.horaInicio,quedada.horaFin)
        const quedadaEstado = {...quedada.toObject(),user, estado}
        res.status(200).json(quedadaEstado); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})

router.post('/buscarQuedadasPorEquipo', async (req, res) => {
    try { 
        const quedadas = await Quedada.find({equipo:req.body.equipo}); 
        if (!quedadas) {
            return res.status(400).json({message: "No hay quedadas"})
        }

        const quedadasConInfo = await Promise.all(
                quedadas.map(async (quedada) =>{
                    const user = await Usuario.findById(quedada.usuario).select('_id username')
                    const estado = conseguirEstado(quedada.fecha,quedada.horaInicio,quedada.horaFin)
                    return {...quedada.toObject(), user, estado }
                
                })
            )
        res.status(200).json(quedadasConInfo); 
    } catch (error) { 
        res.status(400).json({ message: "ERROR" }); 
    }
})

router.post('/buscarQuedadas', async (req,res) => {
    const nombre = req.body.nombre
    try {
        const quedadas = await Quedada.find({ nombre: { $regex: `^${nombre}`, $options: 'i' } })
        const listaFiltrada = quedadas.filter((quedada) => quedada.equipo.length == 0 || !quedada.equipo)
        const quedadasConEstado = await Promise.all(
            listaFiltrada.map((quedada) =>{
                const estado = conseguirEstado(quedada.fecha,quedada.horaInicio,quedada.horaFin)
                return {...quedada.toObject(), estado }
            
            })
        )
        res.status(200).json(quedadasConEstado);
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
})

router.post('/apuntarse',async (req,res) => {
    const idUsuario = req.body.idUsuario
    const idQuedada = req.body.idQuedada
    const desapuntarse = req.body.desapuntarse
    try {
        
            const usuarioExiste = await Usuario.findById(idUsuario)
            const quedadaExiste = await Quedada.findById(idQuedada)
            if (!usuarioExiste || !quedadaExiste) {
                return res.status(400).json({message: "Usuario o quedada no encontrado"})
            }

            if (desapuntarse) {
                if (!usuarioExiste.quedadasAsistidas.includes(idQuedada) || !quedadaExiste.usuariosAsistentes.includes(idUsuario)) {
                    return res.status(400).json({message: "No estas apuntado"})
                }

                usuarioExiste.quedadasAsistidas.splice(usuarioExiste.quedadasAsistidas.indexOf(idQuedada),1)
                quedadaExiste.usuariosAsistentes.splice(quedadaExiste.usuariosAsistentes.indexOf(idUsuario),1)
            } else{
                
                if (usuarioExiste.quedadasAsistidas.includes(idQuedada) || quedadaExiste.usuariosAsistentes.includes(idUsuario)) {
                    return res.status(400).json({message: "Ya estas apuntado"})
                }
                if (quedadaExiste.usuariosAsistentes.length < quedadaExiste.maxAsistentes) {
                    usuarioExiste.quedadasAsistidas.push(idQuedada)
                    quedadaExiste.usuariosAsistentes.push(idUsuario)
                }else{
                    res.status(400).json({message: "Ya estan apuntados el maximo permitido por el creador"})
                }

            }

            

            await usuarioExiste.save()
            const quedada = await quedadaExiste.save()
            const estado = conseguirEstado(quedada.fecha,quedada.horaInicio,quedada.horaFin)
            const quedadaEstado = {...quedada.toObject(), estado}
            res.status(200).json(quedadaEstado)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    

})


//Update by ID Method
router.patch('/putQuedadas/:id', async (req, res) => {
    try { 
        const quedada = await Quedada.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const estado = conseguirEstado(quedada.fecha,quedada.horaInicio,quedada.horaFin)
        const quedadaEstado = {...quedada.toObject(), estado}
        res.status(200).json(quedadaEstado); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})

//Delete by ID Method
router.delete('/deleteQuedada/:idQuedada/:idUsuario', async (req, res) => {
    try { 
        await Quedada.findByIdAndDelete(req.params.idQuedada);
        const user = await Usuario.findById(req.params.idUsuario)
        user.quedadasCreadas.splice(user.quedadasCreadas.indexOf(req.params.idQuedada),1)
        await user.save();
        res.status(200).json({ message: 'quedada eliminado' }); 
    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
})