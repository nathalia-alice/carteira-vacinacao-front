const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const vacinas = await connection('vacinas').select('*');
    
        return response.json(vacinas);
    },

    async create(request, response){
        const { name_vacina, description } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('vacinas').insert({
            id,
            name_vacina,
            description
        });

        return response.json({ id });
    },

}