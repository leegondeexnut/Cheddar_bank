
exports.up = function(knex) {
  knex.schema.createTable('accounts', function (table){
    table.increment('id');
    table.string('account', 12).notNullabe;
    table.integer('amount').defaultTo(0);
    table.foreign('from_account').references('id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};


exports.down = function(knex) {
  
};
