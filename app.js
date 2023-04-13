const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const ERROR_NOT_FOUND = 404;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use((req, res, next) => {
  req.user = {
    _id: '6431bc1cbc2a2f29b83d7075',
  };
  next();
});

app.use('/', require('./routes/cards'));
app.use('/', require('./routes/users'));

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Ошибка путь не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
