// prettier-ignore
module.exports.up = async db => {
  await db.schema.createTable('users', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('email').unique().notNullable();
    table.string('username').unique().notNullable();
    table.string('image').defaultTo('');
    table.string('password').notNullable();
    table.timestamps(false, true);
  });

  await db.schema.createTable('accounts', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('name');
    table.string('currency');
  });

  await db.schema.createTable('users_accounts', table => {
    table.uuid('account_id').notNullable().references('id').inTable('accounts');
    table.uuid('user_id').notNullable().references('id').inTable('users');
    table.string('role');
    table.primary(['account_id', 'user_id']);
    table.timestamps(false, true);
  });

  await db.schema.createTable('categories', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('name').notNullable();
    table.string('type').notNullable();
    table.string('icon');
    table.string('color');
    table.boolean('deleted').notNullable().defaultTo(false);
    table.uuid('account_id').notNullable().references('id').inTable('accounts');
    table.uuid('user_id').notNullable().references('id').inTable('users');
    table.timestamps(false, true);
  });

  await db.schema.createTable('finance_accounts', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('name').notNullable();
    table.string('type').notNullable().defaultTo('checking');
    table.decimal('balance', 8, 2)
    table.string('icon');
    table.string('color');
    table.boolean('deleted').notNullable().defaultTo(false);
    table.uuid('account_id').notNullable().references('id').inTable('accounts');
    table.uuid('user_id').notNullable().references('id').inTable('users');
    table.timestamps(false, true);
  });

  await db.schema.createTable('transactions', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('title');
    table.string('type').notNullable();
    table.timestamp('trade_date').defaultTo(db.fn.now());
    table.decimal('value', 8, 2)
    table.boolean('paid').notNullable().defaultTo(true);
    table.string('note');
    table.timestamp('remind_at');
    table.string('sequence').notNullable().defaultTo(0);
    table.string('total_sequence').notNullable().defaultTo(0);
    table.uuid('category_id').notNullable().references('id').inTable('categories');
    table.uuid('finance_account_id').notNullable().references('id').inTable('finance_accounts');
    table.uuid('from_finance_account_id').references('id').inTable('finance_accounts');
    table.uuid('account_id').notNullable().references('id').inTable('accounts');
    table.uuid('user_id').notNullable().references('id').inTable('users');
    table.timestamps(false, true);
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('transactions');
  await db.schema.dropTableIfExists('finance_accounts');
  await db.schema.dropTableIfExists('categories');
  await db.schema.dropTableIfExists('users_accounts');
  await db.schema.dropTableIfExists('accounts');
  await db.schema.dropTableIfExists('users');
};
