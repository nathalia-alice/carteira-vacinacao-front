const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const userId = request.userId;

        const users = await connection('users').where('id', userId).first();

        return response.json(users);
    },

    async put(request, response){
       
        const id = request.params.id;
        const body = request.body;
       
        await connection('users')
            .where({id: id})
            .update({
                cep: body.cep,
                street: body.street,
                neighborhood: body.neighborhood,
                city: body.city,
                state: body.state,
                number: body.number,
                complement: body.complement,
                telephone: body.telephone,
                email: body.email
            });

        return response.status(200).send({ message: "Alterado com sucesso!" });
       
    }
}