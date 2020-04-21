
exports.up = function (knex) {
    return knex.schema.createTable('vacinasxusuario', function (table) {
        table.string('id_vacina').notNullable();
        table.string('id_usuario').notNullable();
        table.string('date').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('vacinasxusuario');
};
