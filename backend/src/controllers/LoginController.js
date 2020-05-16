const connection = require('../database/connection');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = {

    async login(request, response){
        const formatedPassword = crypto.createHash('md5').update(request.body.password).digest("hex");
        
        const userIdentified = await connection('usuarios').where({
            email: request.body.user,
            senha: formatedPassword
        }).first('id', 'email', 'type');
    
        if(userIdentified){
            const id = userIdentified.id; 
            const email = userIdentified.email; 
            const type = userIdentified.type; 

            var token = jwt.sign({ id, email, type }, process.env.SECRET_KEY, {
                expiresIn: 900
            });

            response.status(200).send({ auth: true, message: "Login realizado com sucesso!", token: token });
        }else{
            response.status(400).send({ auth: false, message: "Login inválido!" });
        }
    }
}