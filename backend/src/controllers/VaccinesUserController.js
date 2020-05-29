const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const userId = request.userId;
        const type = request.type;

        var vaccinesUser;

        if(type === "cidadao"){ 
            vaccinesUser = await connection('vaccinesxuser').select('name', 'id_vaccine', 'id_user', 'name_vaccine', 'description', 'date').
            innerJoin('users', 'users.id', 'vaccinesxuser.id_user').
            innerJoin('vaccines', 'vaccinesxuser.id_vaccine', 'vaccines.id')
            .where('users.id', '=', userId)
        }else{
            vaccinesUser = await connection('vaccinesxuser').select('name', 'id_vaccine', 'id_user', 'name_vaccine', 'description', 'date').
            innerJoin('users', 'users.id', 'vaccinesxuser.id_user').
            innerJoin('vaccines', 'vaccinesxuser.id_vaccine', 'vaccines.id');
        }
 
        return response.json(vaccinesUser);
    },

    async create(request, response) {
        const { id_vaccine, id_user, date } = request.body;

        await connection('vaccinesxuser').insert({
          id_vaccine,
          id_user,
          date
        });

        return response.json({ id_vaccine, id_user, date });
    },

}