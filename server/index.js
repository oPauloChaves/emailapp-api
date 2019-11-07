require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.disable('x-powered-by');

app.use('/', async (_req, res) => {
  try {
    const users = await db('users').select('id', 'email', 'username', 'image');

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: `ERROR: ${err}` });
  }
});

module.exports = app;
