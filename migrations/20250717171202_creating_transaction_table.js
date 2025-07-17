


exports.up = async function(knex) {

  return knex.schema.alterTable('accounts', function (table) {
    table.primary(['id']);
  });
};

exports.down = async function(knex) {
  return knex.schema.alterTable('accounts', function (table) {
    table.dropPrimary();
  });

};
