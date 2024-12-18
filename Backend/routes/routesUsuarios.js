import express from 'express'

const router = express.Router()
//const Usuarios = mongoose.model('usuarios')
import Usuario from '../models/usuarios.js'; // Si el archivo tiene exportación por defecto
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default router;

//Post Method
router.post('/postUsuario', async (req, res) => {
    /*const username = req.body.username;
    const correo = req.body.correo;
    const numeroTlf = req.body.numeroTlf;*/
    
    
    try {
        // Verificar si el usuario, correo o número de teléfono ya existen
        /*const usernameExiste = await Usuario.findOne({ username });
        const numeroTlfExiste = await Usuario.findOne({ numeroTlf });
        const correoExiste = await Usuario.findOne({ correo });*/
        
    
        /*if (usernameExiste || correoExiste || numeroTlfExiste) {
            return res.status(400).json({ message: "Username, correo o número de teléfono ya en uso" });
        }*/
    
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
            amigos: req.body.amigos || [],
            seguidos: req.body.seguidos || [],
            seguidores: req.body.seguidores || [],
        });
    
        // Guardar el usuario en la base de datos
        const usuarioToSave = await usuario.save();
        res.status(200).json(usuarioToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
})

const token_secret = "t$q*H^FIT@B04TAnk#%yr^Vt195B!7z&*63i@uWC^39ed*p2a4"

 function verificarToken (req, res, next) { 
     const token = req.headers.authorization
    if (!token) { 
        return res.status(401).json({message : "Token no recibido"});
    } 
    jwt.verify(token, token_secret, (err, decoded) => { 
        if (err) { 
            return res.status(401).json({ message: `Token inválido` }); 
        } 
        req.user = decoded; 
        const usuario =Usuario.findById(req.user._id)
        console.log(usuario)
        if (usuario != null) {
           next(); 
        } else{
            return res.status(401).json({ message: `Token inválido` });
        }
        
    });
}

router.get('/protected', verificarToken, (req, res) => { 
    
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

router.post('/seguir',async (req,res) => {
    const seguido = req.body.seguido
    const seguidor = req.body.seguidor
    const dejarSeguir = req.body.dejarSeguir
    try {
        if (seguido != seguidor) {

            const seguidoExiste = await Usuario.findById(seguido)
            const seguidorExiste = await Usuario.findById(seguidor)
            if (!seguidoExiste || !seguidorExiste) {
                res.status(400).json({message: "Usuario no encontrado"})
            }

            if (dejarSeguir) {
                if (!seguidorExiste.seguidos.includes(seguidoExiste) || !seguidoExiste.seguidores.includes(seguidorExiste)) {
                    res.status(400).json({message: "No lo estas siguiendo"})
                }

                seguidorExiste.seguidos.splice(seguidorExiste.seguidos.indexOf(seguido),1)
                seguidoExiste.seguidores.splice(seguidoExiste.seguidores.indexOf(seguidor),1)
            } else{
                if (seguidorExiste.seguidos.includes(seguidoExiste) || seguidoExiste.seguidores.includes(seguidorExiste)) {
                    res.status(400).json({message: "Ya esta seguido"})
                }

                seguidorExiste.seguidos.push(seguido)
                seguidoExiste.seguidores.push(seguidor)
            }

            

            await seguidoExiste.save()
            await seguidorExiste.save()

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