// prettier-ignore
module.exports.up = async db => {
  await db.schema.alterTable('transactions', table => {
    table.integer('sequence').notNullable().defaultTo(0).alter();
    table.integer('total_sequence').notNullable().defaultTo(0).alter();
  });
}

// prettier-ignore
module.exports.down = async db => {
  await db.schema.alterTable('transactions', table => {
    table.string('sequence').notNullable().defaultTo(0);
    table.string('total_sequence').notNullable().defaultTo(0);
  });
};
