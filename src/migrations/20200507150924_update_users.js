module.exports.up = async (db) => {
  await db.schema.alterTable('users', (table) => {
    table.string('phone');
    table.string('website');
  });
};

module.exports.down = async (db) => {
  await db.schema.alterTable('users', (table) => {
    table.dropColumn('phone');
    table.dropColumn('website');
  });
};
