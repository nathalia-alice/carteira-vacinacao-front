const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');

        return response.json(users);
    },

    async create(request, response) {
        const { name, doc, cep, street, neighborhood, city, state, number, complement, birth, telephone, type, email, passwordNormalize } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        const password = crypto.createHash('md5').update(passwordNormalize).digest("hex");
       
        var active= false;
        var cpf = false;
        var cnpj = false;
       
        if(doc.length > 11){
            cnpj = true;
        }else{
            cpf = true;
        }

        if(type !== "administrador"){
            active = true;
        }

        await connection('users').insert({
            id,
            name,
            doc,
            cpf,
            cnpj,
            cep,
            street,
            neighborhood,
            city,
            state,
            number,
            complement,
            birth,
            telephone,
            active,
            type,
            email,
            password
        });

        return response.json({ id, name });
    },

    async getUsuariosComVacinas(request, response){
        const userId = request.userId;
        const type = request.type;

        var usersWithVaccines;

        if(type === "cidadao"){ 
            usersWithVaccines = await connection('users').where('id', userId);
        }else{
            usersWithVaccines = await connection('users').select('*');
        }
       
        return response.json(usersWithVaccines);
       
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('users').where('id', id).delete();
        return response.status(200).send({ message: "Deletado com sucesso!" });
    },

    async getUsersDisabled(request, response){
        return true;
    }
}