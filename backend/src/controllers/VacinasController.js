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
        const type = request.type;

        if(type === "administrador"){
            await connection('vacinas').insert({
                id,
                name_vacina,
                description
            });
            
            return response.json({ id });  
        }     
       
    },

    async delete(request, response){
        const { id } = request.params;
        const type = request.type;

        if(type === "administrador"){ 
            await connection('vacinas').where('id', id).delete();
            return response.status(200).send({ message: "Deletado com sucesso!" });
        }
    }
}