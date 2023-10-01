require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');

const { PORT = 3000 } = process.env;
const app = express();
const DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});
app.use(cors({
  credentials: true,
  origin: [/*'https://practical.mesto.students.nomoredomainsrocks.ru'*/'http://localhost:3001'],
}));
app.use(bodyParser.json());
app.use(routerUsers);
app.use(routerMovies);
app.use(errors());
app.listen(PORT);
