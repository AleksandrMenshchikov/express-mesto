const express = require('express');
const path = require('path');
const users = require('./routes/users');
const cards = require('./routes/cards');
const pageNotFound = require('./routes/pageNotFound.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', users);
app.use('/', cards);
app.use('/', pageNotFound);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
