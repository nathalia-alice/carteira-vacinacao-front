const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('vacinasxusuario').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { id_vacina, id_usuario, date } = request.body;

        await connection('vacinasxusuario').insert({
          id_vacina,
          id_usuario,
          date
        });

        return response.json({ id_vacina, id_usuario, date });
    },

}