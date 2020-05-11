const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const usuarios = await connection('usuarios').select('*');

        return response.json(usuarios);
    },

    async create(request, response) {
        const { name, cpf, cnpj, cep, rua, bairro, cidade, estado, numero, complemento, nascimento, telefone, ativo, type, email, senha } = request.body;
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
            ativo,
            type,
            email,
            senha
        });

        return response.json({ id });
    },

    async getUsuariosComVacinas(request, response){
        const usuariosComVacinas = await connection('usuarios').select('*');
        return response.json(usuariosComVacinas);
       
    }
}