const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.disable('x-powered-by');

app.use('/', (_req, res) => {
  res.json({ text: 'Hello, World!' });
});

module.exports = app;
