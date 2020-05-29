const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const vacinas = await connection('vaccines').select('*');
    
        return response.json(vacinas);
    },

    async create(request, response){
        const { name_vaccine, description } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        const type = request.type;

        if(type === "administrador"){
            await connection('vaccines').insert({
                id,
                name_vaccine,
                description
            });
            
            return response.json({ id });  
        }else{
            return response.status(401).send({ message: "Usuário não autorizado." });
        }     
       
    },

    async delete(request, response){
        const { id } = request.params;
        const type = request.type;

        if(type === "administrador"){ 
            await connection('vaccines').where('id', id).delete();
            return response.status(200).send({ message: "Deletado com sucesso!" });
        }else{
            return response.status(401).send({ message: "Usuário não autorizado." });
        }   
    },

    async put(request, response){
       
        const id = request.params.id;
        const name_vaccine = request.body.name_vaccine;
        const description = request.body.description;
        const type = request.type;

        if(type === "administrador"){ 
            await connection('vaccines')
                .where({id: id})
                .update({
                    name_vaccine: name_vaccine,
                    description: description  
                });

            return response.status(200).send({ message: "Alterado com sucesso!" });
        }else{
            return response.status(401).send({ message: "Usuário não autorizado." });
        }   
    }
}