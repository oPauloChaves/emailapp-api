const bcrypt = require('bcrypt');
const faker = require('faker');

const firstId = '2d77b2e0-0167-11ea-a139-75e3b3aa891d';
const users = [
  {
    id: firstId,
    name: 'Paulo Chaves',
    email: 'opaulochaves@gmail.com',
    website: 'https://paulochaves.dev',
  },
  { id: '3d995660-0167-11ea-a139-75e3b3aa891d', name: 'Lebesk Knex', email: 'lebesk@test.js' },
  { id: '4544af90-0167-11ea-a139-75e3b3aa891d', name: 'Bot Bottle', email: 'bot.bottle@test.js' },
  { id: '4b1ca850-0167-11ea-a139-75e3b3aa891d', name: 'John Silva', email: 'john.silva@test.js' },
];

function getUsers() {
  const result = [];
  for (let i = 0; i < 50; i++) {
    const createdAt = faker.date.recent(30);

    result.push({
      id: (users[i] && users[i].id) || faker.random.uuid(),
      email: (users[i] && users[i].email) || faker.internet.email(),
      name: (users[i] && users[i].name) || faker.name.findName(),
      password: (users[i] && users[i].password) || bcrypt.hashSync('12345678', 10),
      image: (users[i] && users[i].image) || faker.image.avatar(),
      website: (users[i] && users[i].website) || faker.internet.url(),
      phone: (users[i] && users[i].phone) || faker.phone.phoneNumberFormat(1),
      created_at: createdAt,
      updated_at: createdAt,
    });
  }

  return result;
}

exports.getUsers = getUsers;

exports.seed = async function (knex) {
  if (process.env.NODE_ENV === 'production') {
    await knex('users')
      .whereIn(
        'email',
        users.map((u) => u.email || `${u.name}@demo.com`),
      )
      .del();
  } else {
    await knex('users').del();
  }

  return knex('users').insert(getUsers());
};
