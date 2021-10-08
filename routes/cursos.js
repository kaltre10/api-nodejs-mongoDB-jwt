const express = require('express');
const ruta = express.Router();
const validate = require('../validate/cursos');
const {
    crearCurso,
    actualizarCurso,
    deleteCursos,
    getCursos,
} = require('../middlewares/cursos');

const verificarAutoritation = require('../middlewares/auth');

ruta.post('/', verificarAutoritation, (req, res) => {
    const { error } = validate.validate({
                                        titulo: req.body.titulo,
                                        descripcion: req.body.descripcion
                                        });
    if(!error){
        const curso = crearCurso(req);
        curso  
            .then(curso => res.json(curso))
            .catch(err => res.status(400).json(err))
    }else{
        res.status(400).json(error);
    } 
});

ruta.put('/:id', (req, res) => {
    const body = req.body;
    const { error } = validate.validate({titulo: body.titulo, descripcion: body.descripcion})
    if(!error){
        const curso = actualizarCurso(req.params.id, body);
        curso  
            .then(curso => res.json(curso))
            .catch(err => res.status(400).json(err))
    }else{
        res.status(400).json(error);
    }
    
});

ruta.delete('/:id', (req, res) => {
    const cursos = deleteCursos(req.params.id);
    cursos  
        .then(curso => res.json(curso))
        .catch(err => res.status(400).json(err))
})

ruta.get('/', verificarAutoritation, (req, res) => {
    const cursos = getCursos();
    cursos  
        .then(curso => res.json(curso))
        .catch(err => res.status(400).json(err))
});

module.exports = ruta;