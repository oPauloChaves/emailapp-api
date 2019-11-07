const bcrypt = require('bcrypt');
const faker = require('faker');

const users = [
  { name: 'admin', id: '2d77b2e0-0167-11ea-a139-75e3b3aa891d' },
  { name: 'demo', id: '3d995660-0167-11ea-a139-75e3b3aa891d' },
  { name: 'bot', id: '4544af90-0167-11ea-a139-75e3b3aa891d' },
  {
    name: 'john',
    email: 'john@thynances.js',
    id: '4b1ca850-0167-11ea-a139-75e3b3aa891d'
  }
];

function getUsers() {
  return users.map(u => ({
    id: u.id,
    email: u.email || `${u.name}@deme.com`,
    username: u.name,
    password: bcrypt.hashSync('X12345678', 10),
    image: faker.image.avatar(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));
}

exports.getUsers = getUsers;

exports.seed = async function(knex) {
  if (process.env.NODE_ENV === 'production') {
    await knex('users')
      .whereIn('email', users.map(u => u.email || `${u.name}@demo.com`))
      .del();
  } else {
    await knex('users').del();
  }

  return knex('users').insert(getUsers());
};
