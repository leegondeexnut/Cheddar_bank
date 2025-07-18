
exports.up = function(knex) {
  return knex.schema.createTable('accounts', function (table){
    table.increments('id');
    table.string('account', 12).notNullabe();
    table.integer('amount').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('accounts')
}
