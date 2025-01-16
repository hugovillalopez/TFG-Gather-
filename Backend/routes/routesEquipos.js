import express from 'express'

const router = express.Router()


import Quedada from '../models/quedadas.js'
import Usuario from '../models/usuarios.js'
import Equipo from '../models/equipos.js'
import mongoose from 'mongoose';

export default router;
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';



// Configurar el SDK de AWS
const s3Client = new S3Client({
    region: 'eu-north-1', // Región de tu bucket
    credentials: {
      accessKeyId: 'AKIA3ISBVXXIWGW6AROY',
      secretAccessKey: '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',
    },
})
// Crear una instancia de S3
const upload = multer({
    storage: multerS3({
      s3: s3Client, // Cambiar a la nueva instancia de S3Client
      bucket: 'gather-7308', // Nombre de tu bucket S3
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `uploads/${Date.now().toString()}-${file.originalname}`); // Nombre único para el archivo
      }
    })
  })

//Post Method
router.post('/postEquipo', upload.single('fotoEquipo'), async (req, res) => {
    const equipoExiste = await Equipo.findOne({
        nombre: req.body.nombre,
        creador: req.body.creador
    });
 
    if (equipoExiste) {
        return res.status(400).json({ message: "Ya existe un equipo con ese nombre y creador." });
    }

    let fotoUrl = '/images/users.webp';
    if (req.file) {
        fotoUrl = req.file.location;
    }

    const equipo = new Equipo({
    nombre: req.body.nombre,
    creador:req.body.creador,
    miembros:req.body.miembros || [],
    foto: fotoUrl
    })
   try {
        equipo.miembros.push(req.body.creador)
        equipo.admins.push(req.body.creador)
        const equipoToSave = await equipo.save();
        const user = await Usuario.findById(req.body.creador)
        user.equipos.push(equipoToSave._id)
        await user.save()
        res.status(200).json(equipoToSave)
   } catch (error) {
        res.status(400).json({message: error.message+ "ERROR"})
   }
})

//Get all Method
router.get('/equipoUsuarios', async (req, res) => {
        try {
            const equipos = await Equipo.find();
            const equiposConUsuarios = await Promise.all(
                equipos.map(async (equipo) =>{
                    const user = await Usuario.findById(equipo.usuario).select('_id username')
                    return {...equipo._doc, user }
                
                })
            )
            
            res.status(200).json(equiposConUsuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
})

router.get('/equipos', async (req, res) => {
    try {
        const equipos = await Equipo.find();
        res.status(200).json(equipos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Get by ID Method
router.get('/equipoId/:id', async (req, res) => {
    try { 
        const equipo = await Equipo.findById(req.params.id); 
        res.status(200).json(equipo); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})
router.post('/equipo/', async (req, res) => {
    try { 
        const equipo = await Equipo.findById(req.body.id); 
        res.status(200).json(equipo); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})

router.post('/mostrarEquipo', async (req,res) => {
    const nombre = req.body.nombre
    try {
        const equipo = await Equipo.findOne({ nombre })
        res.status(200).json(equipo)
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
})

router.post('/buscarEquipos', async (req,res) => {
    const nombre = req.body.nombre
    try {
        const equipo = await Equipo.find({ nombre: { $regex: `^${nombre}`, $options: 'i' } })
        res.status(200).json(equipo)
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
})

router.post('/solicitarEquipo',async (req,res) => {
    const idUsuario = req.body.idUsuario
    const idEquipo = req.body.idEquipo
    const solicitar = req.body.solicitar
    try {
        
            const usuarioExiste = await Usuario.findById(idUsuario)
            const equipoExiste = await Equipo.findById(idEquipo)
            if (!usuarioExiste || !equipoExiste) {
                return res.status(400).json({message: "Usuario o equipo no encontrado"})
            }

            if (usuarioExiste.equipos.includes(idEquipo) || equipoExiste.miembros.includes(idUsuario)) {
                return res.status(400).json({message: "Eres miembro de este equipo"})
            }

            if (!solicitar) {
                if (!usuarioExiste.solicitudes.includes(idEquipo) || !equipoExiste.solicitudes.includes(idUsuario)) {
                    return res.status(400).json({message: "No tienes solicitud"})
                }

                usuarioExiste.solicitudes.splice(usuarioExiste.solicitudes.indexOf(idEquipo),1)
                equipoExiste.solicitudes.splice(equipoExiste.solicitudes.indexOf(idUsuario),1)
                
            } else{
                
                if (usuarioExiste.solicitudes.includes(idEquipo) || equipoExiste.solicitudes.includes(idUsuario)) {
                    return res.status(400).json({message: "Ya has enviado solicitud"})
                }
                
                usuarioExiste.solicitudes.push(idEquipo)
                equipoExiste.solicitudes.push(idUsuario)
                
            }

            const user = await usuarioExiste.save()
            const equipo = await equipoExiste.save()
            res.status(200).json({usuario: user,equipo: equipo})
            
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    

})

router.post('/apuntarseEquipo',async (req,res) => {
    const idUsuario = req.body.idUsuario
    const idEquipo = req.body.idEquipo
    const desapuntarse = req.body.desapuntarse
    try {
        
            const usuarioExiste = await Usuario.findById(idUsuario)
            const equipoExiste = await Equipo.findById(idEquipo)
            if (!usuarioExiste || !equipoExiste) {
                return res.status(400).json({message: "Usuario o equipo no encontrado"})
            }

            if (desapuntarse) {

                if (!usuarioExiste.equipos.includes(idEquipo) || !equipoExiste.miembros.includes(idUsuario)) {
                    return res.status(400).json({message: "No estas apuntado"})
                }

                if (equipoExiste.miembros.length == 1) {
                    await Equipo.findByIdAndDelete(idEquipo);
                    usuarioExiste.equipos.splice(usuarioExiste.equipos.indexOf(idEquipo),1)

                } else {

                    if (equipoExiste.admins.includes(idUsuario)) {
                        equipoExiste.admins.splice(equipoExiste.admins.indexOf(idUsuario),1)
                    }

                    usuarioExiste.equipos.splice(usuarioExiste.equipos.indexOf(idEquipo),1)
                    equipoExiste.miembros.splice(equipoExiste.miembros.indexOf(idUsuario),1)

                }

                
            } else{
                
                if (usuarioExiste.equipos.includes(idEquipo) || equipoExiste.miembros.includes(idUsuario)) {
                    return res.status(400).json({message: "Ya estas apuntado"})
                }

                if (usuarioExiste.solicitudes.includes(idEquipo) || equipoExiste.solicitudes.includes(idUsuario)) {
                    usuarioExiste.solicitudes.splice(usuarioExiste.solicitudes.indexOf(idEquipo),1)
                    equipoExiste.solicitudes.splice(equipoExiste.solicitudes.indexOf(idUsuario),1)
                }
                
                usuarioExiste.equipos.push(idEquipo)
                equipoExiste.miembros.push(idUsuario)
                
            }

            if (equipoExiste.miembros.length == 1) {
                equipoExiste.miembros.forEach(element => {
                    equipoExiste.admins.push(element)
                });
            }

            await usuarioExiste.save()
            if (equipoExiste.miembros.length >= 1) {
                const equipo = await equipoExiste.save()
                res.status(200).json(equipo)
            }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    

})

router.post('/adminsEquipo',async (req,res) => {
    const idUsuario = req.body.idUsuario
    const idEquipo = req.body.idEquipo
    const quitar = req.body.quitar
    try {
        
            const usuarioExiste = await Usuario.findById(idUsuario)
            const equipoExiste = await Equipo.findById(idEquipo)
            if (!usuarioExiste || !equipoExiste) {
                return res.status(400).json({message: "Usuario o equipo no encontrado"})
            }

            if (quitar) {
                if (!usuarioExiste.equipos.includes(idEquipo) || !equipoExiste.admins.includes(idUsuario) || !equipoExiste.miembros.includes(idUsuario)) {
                    return res.status(400).json({message: "Error"})
                }

                equipoExiste.admins.splice(equipoExiste.admins.indexOf(idUsuario),1)
                
            } else{
                
                if (!usuarioExiste.equipos.includes(idEquipo) || equipoExiste.admins.includes(idUsuario) || !equipoExiste.miembros.includes(idUsuario)) {
                    return res.status(400).json({message: "Error"})
                }
                
                equipoExiste.admins.push(idUsuario)
                
            }

            await usuarioExiste.save()
            const equipo = await equipoExiste.save()
            res.status(200).json(equipo)
            
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    

})


//Update by ID Method
router.patch('/putEquipo/:id', async (req, res) => {
    try { 
        const equipoActualizado = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(equipoActualizado); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})

//Delete by ID Method
router.delete('/deleteEquipo/:idEquipo/:idUsuario', async (req, res) => {
    try { 
        await Equipo.findByIdAndDelete(req.params.idEquipo);
        const user = await Usuario.findById(req.params.idUsuario)
        user.equipos.splice(user.equipos.indexOf(req.params.idEquipo),1)
        await user.save();
        res.status(200).json({ message: 'Equipo eliminado' }); 
    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
})

router.post('/actualizarFotoEquipo', upload.single('foto'), async (req, res) => {
    try {
        if (req.file) {
          // La URL pública del archivo subido a S3
            const fileUrl = req.file.location;

            const equipo = await Equipo.findById(req.body.idEquipo)
          
            if (!equipo) {
                return res.status(400).json({message:"Usuario no encontrado"})
            }
                equipo.foto = fileUrl
                equipo.nombre = req.body.nombre
                const equipoToSave = await equipo.save()
                res.status(200).json(equipoToSave)
                
          
          res.status(200).json({
          message: 'Archivo subido exitosamente',
          fileUrl: fileUrl
          });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Error al subir el archivo');
    }
  
  });