const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ongs = await connection('tipousuarios').select('*');
    
        return response.json(ongs);
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