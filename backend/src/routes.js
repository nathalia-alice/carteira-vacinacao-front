const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');
const routes = express.Router();
const VaccinesController = require('./controllers/VaccinesController')
const UsersController = require('./controllers/UsersController')
const VaccinesUserController = require('./controllers/VaccinesUserController')
const LoginController = require('./controllers/LoginController')
const ProfileController = require('./controllers/ProfileController')
const verifyJWT = require('./middlewares/verifyJWT');

routes.post('/vaccines', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name_vaccine: Joi.string().required(),
        description: Joi.string().required()
    })
}), verifyJWT.index, VaccinesController.create);

routes.get('/vaccines', VaccinesController.index);

routes.delete('/vaccines/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().required()
    })
}), verifyJWT.index, VaccinesController.delete);

routes.put('/vaccines/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().required()
    })
}), verifyJWT.index, VaccinesController.put);

routes.get('/profile', verifyJWT.index, ProfileController.index);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        doc: Joi.string().required(),
        cep: Joi.string().required(),
        street: Joi.string().required(),
        neighborhood: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        number: Joi.string().required(),
        complement: Joi.string(),
        birth: Joi.string().required(),
        telephone: Joi.string().required(),
        active: Joi.boolean(),
        type: Joi.string().required(),
        email: Joi.string().required(),
        passwordNormalize: Joi.string().required()
    })
}), UsersController.create);

routes.get('/users', verifyJWT.index, UsersController.getUsuariosComVacinas);

routes.get('/users/disabled', verifyJWT.index, UsersController.getUsersDisabled);

routes.delete('/users/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().required()
    })
}), UsersController.delete);

routes.put('/users/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().required()
    })
}), verifyJWT.index, ProfileController.put);


routes.post('/vaccinesxuser', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id_vaccine: Joi.string().required(),
        id_user: Joi.string(),
        date: Joi.string()
    })
}), VaccinesUserController.create);

routes.get('/vaccinesxuser', verifyJWT.index, VaccinesUserController.index);

/*login*/
routes.post('/login', (req, res) => LoginController.login(req, res));

module.exports = routes;