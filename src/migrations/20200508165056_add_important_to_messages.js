module.exports.up = async (db) => {
  await db.schema.alterTable('messages', (table) => {
    table.boolean('important').defaultTo(false);
  });
};

module.exports.down = async (db) => {
  await db.schema.alterTable('messages', (table) => {
    table.dropColumn('important');
  });
};
