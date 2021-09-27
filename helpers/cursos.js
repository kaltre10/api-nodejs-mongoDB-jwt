const Cursos = require('../models/cursos_model');

async function crearCurso(body){
    const curso = new Cursos({
        titulo: body.titulo,
        descripcion: body.descripcion,
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
    const cursos = await Cursos.find({estado:true});
    return cursos;
}

module.exports = {
    crearCurso,
    actualizarCurso,
    deleteCursos,
    getCursos,
}