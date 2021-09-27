const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');

async function mainMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/prueba');
    } catch (error) {
        console.log('Error al conectar con mongo: ', error);
    }
}

mainMongo();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('servidor conectado!', PORT))