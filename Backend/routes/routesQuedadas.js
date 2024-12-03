const express = require('express');

const router = express.Router()

const Quedada = require('../models/quedadas');
const { default: mongoose } = require('mongoose');

module.exports = router;

//Post Method
router.post('/postQuedada', async (req, res) => {
   const quedada = new Quedada({
    fecha:req.body.fecha,
    hora:req.body.hora,
    lugar:req.body.lugar,
    usuario:req.body.usuario,
    deporte:req.body.deporte,
    valoracion:req.body.valoracion,
   })
   try {
        const quedadaToSave = await quedada.save();
        res.status(200).json(quedadaToSave)
   } catch (error) {
        res.status(400).json({message: error.message})
   }
})

//Get all Method
router.get('/quedadas', async (req, res) => {
        try {
            const quedadas = await Quedada.find();
            res.status(200).json(quedadas);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
})

//Get by ID Method
router.get('/quedada/:id', async (req, res) => {
    try { 
        const quedada = await Quedada.findById(req.params.id); 
        res.status(200).json(quedada); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})

//Update by ID Method
router.patch('/putQuedadas/:id', async (req, res) => {
    try { 
        const quedadaActualizado = await Quedada.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(quedadaActualizado); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})

//Delete by ID Method
router.delete('/deleteQuedada/:id', async (req, res) => {
    try { 
        await Quedada.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'quedada eliminado' }); 
    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
})