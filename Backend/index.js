import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config()
const mongoString = process.env.DATABASE_URL


mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) =>{
    console.log(error)
})

database.once('connected',() =>{
    console.log('Database Connected');
})

const app = express();
app.use(cors())
app.use(helmet())
import routesUsuarios from './routes/routesUsuarios.js';
import routesQuedadas from './routes/routesQuedadas.js';
import { insertarUsuarios } from './cargarDatos.js';

app.use(express.json());

app.use('/gather', routesUsuarios)
app.use('/gather', routesQuedadas)

//insertarUsuarios()

app.listen(3000, () =>{
    console.log(`HOLA HUGO ${3000}`)
})