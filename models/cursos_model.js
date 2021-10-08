const mongoose = require('mongoose');
const { schema } = require('../validate/cursos');
const Schema = mongoose.Schema;

const autorShema = new mongoose.Schema({
    nombre: String,
    email: String
});

const cursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        unique: true,
        required: true
    },
    autor: autorShema,
    // autor: [{ 
    //     type: Schema.Types.ObjectId,
    //     ref: 'Usuarios' 
    // }],
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    },
    calificacion: {
        type: Number,
        default: 0
    },
    alumnos: {
        type: Number, 
        default: 0
    }
})

module.exports = mongoose.model('Cursos', cursoSchema);