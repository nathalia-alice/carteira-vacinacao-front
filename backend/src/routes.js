const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const TipoUsuariosController = require('./controllers/TipoUsuariosController')
const VacinasController = require('./controllers/VacinasController')

const routes = express.Router();

routes.post('/tipousuarios', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}), TipoUsuariosController.create);

routes.get('/tipousuarios', TipoUsuariosController.index);

routes.post('/vacinas', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required()
    })
}), VacinasController.create);

routes.get('/vacinas', VacinasController.index);

module.exports = routes;