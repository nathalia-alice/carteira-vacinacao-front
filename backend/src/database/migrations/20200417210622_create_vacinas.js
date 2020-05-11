
exports.up = function(knex) {
    return knex.schema.createTable('vacinas', function(table){
        table.string('id').primary();
        table.string('name_vacina').notNullable();
        table.string('description').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('vacinas');
};
