const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const tipoUsuarios = await connection('tipousuarios').select('*');
    
        return response.json(tipoUsuarios);
    },

    async create(request, response){
        const { name } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('tipousuarios').insert({
            id,
            name
        });

        return response.json({ id });
    },

}