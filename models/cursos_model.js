const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        unique: true,
        required: true
    },
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