exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table
      .uuid('id')
      .unique()
      .primary()
      .notNullable();
    table
      .string('email')
      .unique()
      .notNullable();
    table
      .string('username')
      .unique()
      .notNullable();
    table.string('image').defaultTo('');
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

  // .createTable('transactions', function(table) {
  //   table
  //     .uuid('id')
  //     .unique()
  //     .primary()
  //     .notNullable();
  //   table.string('title');
  //   table.string('description').notNullable();
  //   table.decimal('value', 10, 2).notNullable();
  //   table.timestamp('trade_date');
  //   table.boolean('paid').defaultTo(true);
  //   table.string('note');
  //   table.timestamp('remind_at');
  //   table.string('type');
  //   table
  //     .uuid('author')
  //     .notNullable()
  //     .references('users.id');
  //   table.timestamps(true, true);
  // });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
  // .dropTableIfExists('transactions');
};
