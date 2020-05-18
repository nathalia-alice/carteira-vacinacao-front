const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const userId = request.userId;

        const usuarios = await connection('usuarios').where('id', userId).first();

        return response.json(usuarios);
    }
}