const Cursos = require('../models/cursos_model');

async function crearCurso(req){
    const curso = new Cursos({
        titulo: req.body.titulo,
        autor: req.usuario,
        descripcion: req.body.descripcion,
    })
    return await curso.save();
}

async function actualizarCurso(id, body){
    const { titulo, descripcion } = body;
    const curso = await Cursos.findByIdAndUpdate(id, {titulo, descripcion});
    return curso;
}

async function deleteCursos(id){
    const curso = await Cursos.findByIdAndUpdate(id, {$set: {estado: false}},{new:true});
    return curso;
}

async function getCursos(){
    const cursos = await Cursos
                            .find({'estado':true})
                            // .populate('autor', 'nombre -_id')
    return cursos;
}

module.exports = {
    crearCurso,
    actualizarCurso,
    deleteCursos,
    getCursos,
}