require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.disable('x-powered-by');

app.use('/api/users', async (_, res) => {
  try {
    const users = await db('users').select('id', 'email', 'name', 'image', 'phone', 'website');

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: `ERROR: ${err}` });
  }
});

module.exports = app;
