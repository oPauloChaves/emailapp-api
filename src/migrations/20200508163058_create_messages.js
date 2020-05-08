module.exports.up = async (db) => {
  await db.schema.createTable('messages', (table) => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('to').notNullable();
    table.string('subject').notNullable();
    table.string('body').defaultTo('');
    table.timestamps(false, true);
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('messages');
};
