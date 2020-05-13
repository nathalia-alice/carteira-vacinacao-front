
exports.up = function (knex) {
    return knex.schema.createTable('usuarios', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('doc').notNullable();
        table.boolean('cpf').notNullable();
        table.boolean('cnpj').notNullable();
        table.string('cep').notNullable();
        table.string('rua').notNullable();
        table.string('bairro').notNullable();
        table.string('cidade').notNullable();
        table.string('estado').notNullable();
        table.string('numero').notNullable();
        table.string('complemento').notNullable();
        table.string('nascimento').notNullable();
        table.string('telefone').notNullable();
        table.boolean('ativo').notNullable();
        table.string('type').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('usuarios');
};
