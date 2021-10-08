const jwt = require('jsonwebtoken');
const config = require('config');

function verificarAutoritation(req, res, next){
    const token = req.get('autoritation');
    jwt.verify(token, config.get('configToken.SEED'), (err, decoded) => {
        if(err) return res.status(401).json({error: err});
        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = verificarAutoritation;