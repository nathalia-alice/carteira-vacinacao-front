const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');
const routes = express.Router();
const VacinasController = require('./controllers/VacinasController')
const UsuariosController = require('./controllers/UsuariosController')
const VacinasPorUsuarioController = require('./controllers/VacinasPorUsuarioController')
const LoginController = require('./controllers/LoginController')
const ProfileController = require('./controllers/ProfileController')
const verifyJWT = require('./middlewares/verifyJWT');
const jwt = require('jsonwebtoken');

routes.post('/vacinas', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name_vacina: Joi.string().required(),
        description: Joi.string().required()
    })
}), VacinasController.create);

routes.get('/vacinas', VacinasController.index);

routes.get('/profile', verifyJWT.index, ProfileController.index);

routes.post('/usuarios', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        doc: Joi.string(),
        cep: Joi.string().required(),
        rua: Joi.string().required(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string(),
        nascimento: Joi.string().required(),
        telefone: Joi.string().required(),
        ativo: Joi.boolean(),
        type: Joi.string().required(),
        email: Joi.string().required(),
        senhaNormalize: Joi.string().required()
    })
}), UsuariosController.create);

routes.get('/usuarios', verifyJWT.index, UsuariosController.getUsuariosComVacinas);

routes.delete('/usuarios/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().required()
    })
}), UsuariosController.delete);

routes.post('/vacinasxusuario', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id_vacina: Joi.string().required(),
        id_usuario: Joi.string(),
        date: Joi.string()
    })
}), VacinasPorUsuarioController.create);

routes.get('/vacinasxusuario', verifyJWT.index, VacinasPorUsuarioController.index);

routes.post('/login', (req, res) => LoginController.login(req, res));

module.exports = routes;