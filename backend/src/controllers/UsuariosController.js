const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('usuarios').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, cpf, cnpj, cep, rua, bairro, cidade, estado, numero, complemento, nascimento, telefone, ativo } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('usuarios').insert({
            id,
            name,
            cpf,
            cnpj,
            cep,
            rua,
            bairro,
            cidade,
            estado,
            numero,
            complemento,
            nascimento,
            telefone,
            ativo
        });

        return response.json({ id });
    },

}