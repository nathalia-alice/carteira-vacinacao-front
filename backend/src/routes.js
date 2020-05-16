const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const TipoUsuariosController = require('./controllers/TipoUsuariosController')
const VacinasController = require('./controllers/VacinasController')
const UsuariosController = require("./controllers/UsuariosController")
const VacinasPorUsuarioController = require("./controllers/VacinasPorUsuarioController")

const routes = express.Router();
var jwt = require('jsonwebtoken');
routes.post('/tipousuarios', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}), TipoUsuariosController.create);

routes.get('/tipousuarios', TipoUsuariosController.index);

routes.post('/vacinas', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name_vacina: Joi.string().required(),
        description: Joi.string().required()
    })
}), VacinasController.create);

routes.get('/vacinas', VacinasController.index);

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
        senha: Joi.string().required()
    })
}), UsuariosController.create);

routes.get('/usuarios', verifyJWT, UsuariosController.getUsuariosComVacinas);

routes.post('/vacinasxusuario', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id_vacina: Joi.string().required(),
        id_usuario: Joi.string(),
        date: Joi.string()
    })
}), VacinasPorUsuarioController.create);

routes.get('/vacinasxusuario', VacinasPorUsuarioController.index);

routes.post('/login', (req, res, next) => {
    if(req.body.user === 'luiz' && req.body.pwd === '123'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 900 // expires in 15min
      });
      res.status(200).send({ auth: true, token: token, id : "teste" });
    }else{
        res.status(401).send({ message: "Login inválido!" });
    }

  })


  function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }
module.exports = routes;