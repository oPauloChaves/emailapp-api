module.exports.up = async (db) => {
  await db.schema.alterTable('messages', (table) => {
    table.text('body').defaultTo('').alter();
  });
};

module.exports.down = async (db) => {
  await db.schema.alterTable('messages', (table) => {
    table.string('body').defaultTo('').alter();
  });
};
