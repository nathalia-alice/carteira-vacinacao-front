const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const VacinasController = require('./controllers/VacinasController')
const UsuariosController = require("./controllers/UsuariosController")
const VacinasPorUsuarioController = require("./controllers/VacinasPorUsuarioController")
const LoginController = require("./controllers/LoginController")
const ProfileController = require("./controllers/ProfileController")

const routes = express.Router();
var jwt = require('jsonwebtoken');


routes.post('/vacinas', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name_vacina: Joi.string().required(),
        description: Joi.string().required()
    })
}), VacinasController.create);

routes.get('/vacinas', VacinasController.index);

routes.get('/profile', verifyJWT, ProfileController.index);

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

routes.get('/usuarios', verifyJWT, UsuariosController.getUsuariosComVacinas);

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

routes.get('/vacinasxusuario', verifyJWT, VacinasPorUsuarioController.index);

routes.post('/login', (req, res) => LoginController.login(req, res, jwt));

function verifyJWT(req, res, next){
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token fornecido.' });
  
  jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    req.email = decoded.email;
    req.type = decoded.type;

    next();
  });
}

module.exports = routes;