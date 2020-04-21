const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const TipoUsuariosController = require('./controllers/TipoUsuariosController')
const VacinasController = require('./controllers/VacinasController')
const UsuariosController = require("./controllers/UsuariosController")
const VacinasPorUsuarioController = require("./controllers/VacinasPorUsuarioController")

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

routes.post('/usuarios', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        cpf: Joi.string(),
        cnpj: Joi.string(),
        cep: Joi.string().required(),
        rua: Joi.string().required(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string(),
        nascimento: Joi.string().required(),
        telefone: Joi.string().required(),
        ativo: Joi.boolean().required()
    })
}), UsuariosController.create);

routes.get('/usuarios', UsuariosController.index);

routes.post('/vacinasxusuario', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id_vacina: Joi.string().required(),
        id_usuario: Joi.string(),
        date: Joi.string()
    })
}), VacinasPorUsuarioController.create);

routes.get('/vacinasxusuario', VacinasPorUsuarioController.index);

module.exports = routes;