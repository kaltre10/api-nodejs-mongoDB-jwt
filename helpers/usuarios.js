const Usuario = require('../models/usuarios_model');
const bcrypt = require('bcrypt');

async function crearUsuario(body){
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10)
    });
    return await usuario.save();
}

async function actualizarUsuario(email, body){
    let usuario = await Usuario.findOneAndUpdate(email, {
        $set: {
            nombre: body.nombre,
            password: body.password
        }
    }, {new: true});
    return usuario;
}

async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate(email, {
        $set: {
            estado: false
        }
    }, {new: true});
    return usuario;
}

async function getUsuarios(){
    let usuarios = await Usuario.find({estado:true})
                                .select({nombre:1, email:1});
    return usuarios;
}

async function existeEmail(req, res, next){
    Usuario.findOne({email: req.body.email}, (err, user) => {
        if(err) res.status(400).json({error: "Server Error"});
        if(user) res.status(400).json({msj: "El usuario ya Existe"})
        if(!err && !user){
            next();
        }else{
            return;
        }
    });
}

module.exports = {
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    getUsuarios,
    existeEmail
}