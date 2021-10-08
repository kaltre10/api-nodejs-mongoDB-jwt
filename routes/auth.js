const express = require('express');
const jwt = require('jsonwebtoken');
const ruta = express.Router();
const Usuarios = require('../models/usuarios_model');
const bcrypt = require('bcrypt');
const config = require('config');

ruta.post('/', (req, res) => {
    Usuarios.findOne({email: req.body.email })
        .then(datos => {
            if(datos){
                const passUser = bcrypt.compareSync(req.body.password, datos.password) 
                if(!passUser){
                    return res.status(400).json({msj: "Usuario o contraseña no existe"})
                }else{
                    const jwToken = jwt.sign({
                        usuario: {
                            _id: datos._id,
                            email: datos.email,
                            nombre: datos.nombre
                        }
                      }, config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') });
                    res.json({ usuario: {
                        _id: datos._id,
                            email: datos.email,
                            nombre: datos.nombre
                     }, jwToken });
                }
               
            }else{
                return res.status(400).json({msj: "Usuario o contraseña no existe"})
            }
        })
        .catch(err => res.status(400).json({error: 'Ah ocurrido un error inesperado', err}))
});

module.exports = ruta;