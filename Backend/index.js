require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const helmet = require('helmet')
const mongoString = process.env.DATABASE_URL


mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) =>{
    console,log(error)
})

database.once('connected',() =>{
    console.log('Database Connected');
})

const app = express();
app.use(cors())
app.use(helmet())
const routesUsuarios = require('./routes/routesUsuarios');
const routesQuedadas = require('./routes/routesQuedadas');

app.use(express.json());

app.use('/gather', routesUsuarios)
app.use('/gather', routesQuedadas)

app.listen(3000, () =>{
    console.log(`HOLA HUGO ${3000}`)
})