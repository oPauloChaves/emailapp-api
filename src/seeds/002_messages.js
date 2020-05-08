const faker = require('faker');

const users = [
  { email: 'opaulochaves@gmail.com' },
  { email: 'lebesk@test.js' },
  { email: 'bot.bottle@test.js' },
  { email: 'john.silva@test.js' },
];

function getMessages() {
  const result = [];
  for (let i = 0; i < 30; i++) {
    const createdAt = faker.date.recent(15);
    const userIndex = faker.random.number({ max: 3 });

    result.push({
      id: faker.random.uuid(),
      to: users[userIndex].email,
      subject: faker.lorem.sentence(),
      body: faker.lorem.sentences(),
      important: faker.random.boolean(),
      created_at: createdAt,
      updated_at: createdAt,
    });
  }

  return result;
}

exports.seed = async function (knex) {
  await knex('messages').del();
  return knex('messages').insert(getMessages());
};
