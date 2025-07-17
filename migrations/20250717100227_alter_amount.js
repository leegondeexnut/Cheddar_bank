
exports.up = function(knex) {
  return knex.schema.alterTable('accounts',function(table){
    table.renameColumn('amount','balance');

  }).then(()=>{
    return knex.schema.alterTable('accounts',function(table){
        table.decimal('balance').alter();
    })

  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('accounts',function(table){
    table.integer('balance').alter();
    table.renameColumn('balance', 'amount');
});
};