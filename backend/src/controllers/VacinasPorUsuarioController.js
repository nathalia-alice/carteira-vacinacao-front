const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const userId = request.userId;
        const type = request.type;

        var vacinasPorUsuario;

        if(type === "cidadao"){ 
            vacinasPorUsuario = await connection('vacinasxusuario').select('name', 'id_vacina', 'id_usuario', 'name_vacina', 'description', 'date').
            innerJoin('usuarios', 'usuarios.id', 'vacinasxusuario.id_usuario').
            innerJoin('vacinas', 'vacinasxusuario.id_vacina', 'vacinas.id')
            .where('usuarios.id', '=', userId)
        }else{
            vacinasPorUsuario = await connection('vacinasxusuario').select('name', 'id_vacina', 'id_usuario', 'name_vacina', 'description', 'date').
            innerJoin('usuarios', 'usuarios.id', 'vacinasxusuario.id_usuario').
            innerJoin('vacinas', 'vacinasxusuario.id_vacina', 'vacinas.id');
        }
 
        return response.json(vacinasPorUsuario);
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