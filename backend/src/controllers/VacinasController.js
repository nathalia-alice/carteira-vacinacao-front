const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ongs = await connection('vacinas').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const { name, description } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('vacinas').insert({
            id,
            name,
            description
        });

        return response.json({ id });
    },

}