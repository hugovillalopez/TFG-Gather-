import express from 'express'

const router = express.Router()
//const Usuarios = mongoose.model('usuarios')
import Usuario from '../models/usuarios.js'; // Si el archivo tiene exportación por defecto
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import nodemailer from 'nodemailer'

export default router;
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Configurar el SDK de AWS
const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: 'AKIA3ISBVXXIWGW6AROY',
      secretAccessKey: '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',
    },
})
// Crear una instancia de S3
const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: 'gather-7308', 
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
      }
    })
  })

//Post Method
router.post('/postUsuario',upload.single('fotoPerfil'), async (req, res) => {
    const username = req.body.username;
    const correo = req.body.correo;
    const numeroTlf = req.body.numeroTlf;
    
    try {
        // Verificar si el usuario, correo o número de teléfono ya existen
        const usernameExiste = await Usuario.findOne({ username });
        const numeroTlfExiste = await Usuario.findOne({ numeroTlf });
        const correoExiste = await Usuario.findOne({ correo });
        
    
        if (usernameExiste) {
            return res.status(400).json({ message: "Username ya en uso" });
        }
         
        if (numeroTlfExiste) {
            return res.status(400).json({ message: "Ya hay otra cuenta con este telefono" });
        }

        if (correoExiste) {
            return res.status(400).json({ message: "Ya hay otra cuenta con este correo" });
        }
        let fotoUrl = '/images/users.webp';
        if (req.file) {
            fotoUrl = req.file.location;
        }
          
    
        // Encriptar la contraseña
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    
        // Crear el nuevo usuario
        const usuario = new Usuario({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            username: req.body.username,
            correo: req.body.correo,
            password: hashedPassword,
            fechaNacimiento: req.body.fechaNacimiento,
            numeroTlf: req.body.numeroTlf,
            quedadasCreadas: req.body.quedadasCreadas || [],
            quedadasAsistidas: req.body.quedadasAsistidas || [],
            solicitudes: req.body.solicitudes || [],
            seguidos: req.body.seguidos || [],
            seguidores: req.body.seguidores || [],
            equipos: req.body.equipos || [],
            foto:fotoUrl,
        });
    
        // Guardar el usuario en la base de datos
        const usuarioToSave = await usuario.save();
        res.status(200).json(usuarioToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
})

function generarTokenSecret(usuarioId) { 
    if (!usuarioId) {
        return res.status(401).json({message : "usuario Id ERROR"});
    }
    return crypto.createHmac('sha256', process.env.MASTER_TOKEN_KEY).update(usuarioId.toString()) .digest('hex'); 
}

async function verificarToken (req, res, next) { 
     const token = req.headers.authorization
     try {
        if (!token) { 
        return res.status(401).json({message : "Token no recibido"});
        } 
            const decoded = jwt.decode(token)
            if (!decoded || !decoded.id) {
                return res.status(401).json({ message: `Token inválido` });
            }
            const usuarioId = decoded.id
            const token_secret = generarTokenSecret(usuarioId)
            const usuario = await Usuario.findById(usuarioId)
            if (usuario != null) {
                jwt.verify(token, token_secret,  (err, decodedToken) => { 
                    if (err) {
                        return res.status(401).json({ message: `Token inválido` });
                    }
                    req.user = decodedToken
                    next(); 
                });
            } else{
                return res.status(401).json({ message: `Token inválido` });
            }
            
        
     } catch (error) {
        return res.status(500).json({ message: error.message });
     }

}

router.get('/protected', verificarToken, async (req, res) => { 
    
    res.json({ mensaje: 'Acceso Permitido', usuario: req.user, autenticado: true }); 
});

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password 
    try {
         const usuario = await Usuario.findOne({ username });
         if (!usuario) {
            return res.status(400).json({message: "Username incorrecto"})
         }else{
            const isMatch = await bcrypt.compare(password, usuario.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
                
            }else{
                const token_secret = generarTokenSecret(usuario._id)
                const token = jwt.sign(
                    { id: usuario._id, username: usuario.username },
                    token_secret, // Usa una clave secreta segura
                    { expiresIn: '1h' }
                );
                res.json({token})
                
            }
         }

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
router.post('/usuario', async (req, res) => {
    try { 
        const usuario = await Usuario.findById(req.body.id); 
        if (!usuario) {
            return res.status(400).json({ message: error.message }); 
        }
        res.status(200).json(usuario); 
    } catch (error) { 
        res.status(400).json({ message: error.message }); 
    }
})

router.post('/mostrarUsuario', async (req,res) => {
    const username = req.body.username
    try {
        const usuario = await Usuario.findOne({ username })
        res.status(200).json(usuario)
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
})

router.post('/buscarUsuarios', async (req,res) => {
    const username = req.body.username
    try {
        const usuarios = await Usuario.find({ username: { $regex: `^${username}`, $options: 'i' } })
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
})

router.post('/cambiarPassword', async (req,res) => {
    const passwordActual = req.body.password
    try {
        const usuario = await Usuario.findById( req.body.idUsuario )
        if (!usuario) {
            return res.status(400).json({message: "Usuario no encontrado"})
        }

        const isMatch = await bcrypt.compare(passwordActual, usuario.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña actual incorrecta' });
        }

        if (req.body.passwordActual == req.body.newPassword) {
            return res.status(400).json({ message: 'Contraseña nueva no coincide con la confirmacion' });
        }
            
        if (req.body.newPassword != req.body.confirmNewPassword) {
            return res.status(400).json({ message: 'Contraseña nueva no cooncide con la confirmacion' });
        }
               
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); 
        usuario.password = hashedPassword

        const user = await usuario.save()
        res.status(200).json(user)
            
        res.status(200).json(usuario)
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
})

router.post('/seguir',async (req,res) => {
    const seguido = req.body.seguido
    const seguidor = req.body.seguidor
    const dejarSeguir = req.body.dejarSeguir
    try {
        if (seguido != seguidor) {

            const seguidoExiste = await Usuario.findById(seguido)
            const seguidorExiste = await Usuario.findById(seguidor)
            if (!seguidoExiste || !seguidorExiste) {
                return res.status(400).json({message: "Usuario no encontrado"})
            }

            if (dejarSeguir) {
                if (!seguidorExiste.seguidos.includes(seguido) || !seguidoExiste.seguidores.includes(seguidor)) {
                    return res.status(400).json({message: "No lo estas siguiendo"})
                }

                seguidorExiste.seguidos.splice(seguidorExiste.seguidos.indexOf(seguido),1)
                seguidoExiste.seguidores.splice(seguidoExiste.seguidores.indexOf(seguidor),1)
            } else{
                if (seguidorExiste.seguidos.includes(seguido) || seguidoExiste.seguidores.includes(seguidor)) {
                    return res.status(400).json({message: "Ya esta seguido"})
                }

                seguidorExiste.seguidos.push(seguido)
                seguidoExiste.seguidores.push(seguidor)
            }

            

            const seguidoToSave = await seguidoExiste.save()
            const seguidorToSave = await seguidorExiste.save()
            res.status(200).json({seguidor: seguidoToSave,seguidor: seguidorToSave}); 
        }
    } catch (error) {
        res.status(400).json({message: error.message})
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

// Endpoint para subir archivos
router.post('/actualizarFotoUsuario', upload.single('foto'), async (req, res) => {
  try {
    if (req.file) {
        // La URL pública del archivo subido a S3
        const fileUrl = req.file.location;

        const user = await Usuario.findById(req.body.idUsuario)

        if (!user) {
           return res.status(400).json({message:"Usuario no encontrado"})
        }
        user.foto = fileUrl
        await user.save()
        
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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: '1//04u1cbj06WgolCgYIARAAGAQSNwF-L9IrhaJP4X1eiiEUQnFpKPIXMwEs83JfqwaaHQsDuF7pGY3ZDL-S8LHZjdkAW76PrnG9sqo',
    },
    
  });

  router.post('/olvidadaPassword', async (req, res) => {
    
    try { 
        const correo = req.body.correo
        const user = await Usuario.findOne({correo})
        if (!user) {
            return res.status(400).json({message:"Usuario no encontrado"})
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 3600000; 

        await user.save()

        const url = `${process.env.CLIENT_URL}/olvidadaPassword/${resetToken}`

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.correo,
            subject: 'Restablecer tu contraseña',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${url}`,
        });

    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
})

router.post('/olvidadaPassword/:token', async (req, res) => {
    try {
      const user = await Usuario.findOne({ resetToken: req.params.token, resetTokenExpire: { $gt: Date.now() } });
  
      if (!user) {
        return res.status(400).send('El token de restablecimiento es inválido o ha caducado.');
      }

      const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
      user.password = hashedPassword;  
      user.resetToken = undefined;
      user.resetTokenExpire = undefined;
  
      await user.save();
      res.status(200).send('Contraseña actualizada con éxito.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  });
  

