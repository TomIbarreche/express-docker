
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('first_name').notNullable();
        table.string('email').notNullable().unique();
        table.integer('age').notNullable();
        table.timestamps(true, true);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  