
exports.up = function(knex) {
  return knex.schema.table('accounts', function(table) {
    table.string('pincode', 6).notNullable();
  })
};


exports.down = function(knex) {
  return knex.schema.table('accounts', function(table){
    table.dropColumn('pincode');
  })
  
};
