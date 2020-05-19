var jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res, next){
        var token = req.headers['x-access-token'];

        if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token fornecido.' });

        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            req.email = decoded.email;
            req.type = decoded.type;

            next();
        });
    }
}