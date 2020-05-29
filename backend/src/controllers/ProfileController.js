const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const userId = request.userId;

        const users = await connection('users').where('id', userId).first();

        return response.json(users);
    }
}