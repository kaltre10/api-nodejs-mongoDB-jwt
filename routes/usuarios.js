const express = require('express');
const ruta = express.Router();
const validate = require('../validate/usuarios');
const {
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    getUsuarios,
    existeEmail,
} = require('../middlewares/usuarios');

const verificarAutoritation = require('../middlewares/auth');

ruta.get('/', verificarAutoritation, (req, res) => {
    let usuarios = getUsuarios();
    usuarios    
        .then(user => res.json(user))
        .catch(err => res.status(400).json({error:err}))
});

ruta.post('/', existeEmail, (req, res) => {

    const body = req.body;
    const { error } = validate.validate({nombre: body.nombre, email: body.email});

    if(!error){
        const resultado = crearUsuario(body);
        resultado
            .then( user => res.json({nombre: user.nombre, email: user.email}))
            .catch( err => res.status(400).json({ error: err }))
    }else{
        res.status(400).json({error});
    }

});

ruta.put('/:email', (req, res) => {
    
    const { error } = validate.validate({nombre: req.body.nombre});
    if(!error) {
        let usuario = actualizarUsuario(req.params.email, req.body);
        usuario
            .then( user => res.json({nombre: user.nombre, email: user.email}))
            .catch( err => res.status(400).json({ error: err }))
    }else{
        res.status(400).json({error});
    }

});

ruta.delete('/:email', (req, res) => {
    let usuario = desactivarUsuario(req.params.email);
    usuario
        .then( user => res.json({nombre: user.nombre, email: user.email}))
        .catch( err => res.status(400).json({ error: err }))
});

module.exports = ruta;