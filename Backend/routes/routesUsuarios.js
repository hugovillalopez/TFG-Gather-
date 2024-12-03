const express = require('express');

const router = express.Router()
//const Usuarios = mongoose.model('usuarios')
const Usuario = require('../models/usuarios');
const { default: mongoose } = require('mongoose');

module.exports = router;

//Post Method
router.post('/postUsuario', async (req, res) => {
   const usuario = new Usuario({
    nombre:req.body.nombre,
    edad:req.body.edad,
    correo:req.body.correo,
    password:req.body.password,
   })
   try {
        const usuarioToSave = await usuario.save();
        res.status(200).json(usuarioToSave)
   } catch (error) {
        res.status(400).json({message: error.message})
   }
})

//Get all Method
router.get('/usuarios', async (req, res) => {
        try {
            const usuarios = await Usuario.find();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
})

//Get by ID Method
router.get('/usuario/:id', async (req, res) => {
    try { 
        const usuario = await Usuario.findById(req.params.id); 
        res.status(200).json(usuario); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})

//Update by ID Method
router.patch('/putUsuarios/:id', async (req, res) => {
    try { 
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(usuarioActualizado); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})

//Delete by ID Method
router.delete('/deleteUsuario/:id', async (req, res) => {
    try { 
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Usuario eliminado' }); 
    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
})