const Joi = require('joi');

const cursoValidateSchema = Joi.object({
    titulo: Joi.string()
        .min(3).message('minimo 3 caracteres')
        .max(100).message('Maximo 20 caracteres')
        .required(),

    descripcion: Joi.string()
        .min(3).message('minimo 3 caracteres')
        .max(100).message('Maximo 20 caracteres')
        .required(),

});

module.exports = cursoValidateSchema;