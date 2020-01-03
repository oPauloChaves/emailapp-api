// prettier-ignore
module.exports.up = async db => {
  await db.schema.alterTable('transactions', table => {
    table.uuid('previous_transaction_id').references('id').inTable('transactions');
    table.uuid('next_transaction_id').references('id').inTable('transactions');
  });
}

module.exports.down = async db => {
  await db.schema.alterTable('transactions', table => {
    table.dropColumn('previous_transaction_id');
    table.dropColumn('next_transaction_id');
  });
};
