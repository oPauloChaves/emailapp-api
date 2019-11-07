// prettier-ignore
module.exports.up = async db => {
  await db.schema.alterTable('categories', table => {
    table.uuid('parent_id').notNullable().references('id').inTable('categories');
  });
}

module.exports.down = async db => {
  await db.schema.alterTable('categories', table => {
    table.dropColumn('parent_id');
  });
};
