require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.disable('x-powered-by');

app.get('/contacts', async (req, res) => {
  try {
    const { q = '' } = req.query;

    console.log('[contacts][get] query contacts %j', { q });

    // https://stackoverflow.com/questions/7005302/postgresql-how-to-make-case-insensitive-query#comment8370418_7005332
    // specify varchar_pattern_ops if you want the index to work with LIKE 'xxx%' query,
    // i.e. CREATE INDEX ix_groups_name ON groups (lower(name) varchar_pattern_ops)
    const contacts = await db('users')
      .where('name', 'ilike', `%${q}%`)
      .select('id', 'email', 'name', 'image', 'phone', 'website');

    console.log('[contacts][get] found %d contacts', contacts.length);

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ err: `ERROR: ${err}` });
  }
});

app.get('/messages', async (req, res) => {
  try {
    const { important } = req.query;

    console.log('[messages][get] query messages %j', { important: important !== undefined });

    const messages = await db('messages')
      .where('important', '=', important !== undefined)
      .select('id', 'to', 'subject', 'body');

    console.log('[messages][get] found %d messages', messages.length);

    return res.json(messages);
  } catch (err) {
    res.status(500).json({ err: `ERROR: ${err}` });
  }
});

module.exports = app;
