


exports.up = function(knex) {
  return knex.schema.createTable('transactions', function (table) {
    table.increments('transaction_id');
    table.integer('amount').notNullable();
    table.integer('from_account').unsigned().nullable();
    table.integer('to_account').unsigned().nullable();
    table.foreign('from_account').references('id').inTable('accounts');
    table.foreign('to_account').references('id').inTable('accounts');
    table.timestamp('transacted_at').defaultTo(knex.fn.now());
  });
};


exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
  
};
