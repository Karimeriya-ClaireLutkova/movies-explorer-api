require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { DATABASE_URL, PORT } = require('./utils/constants');

const app = express();
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3001'],
}));
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(auth);
app.use(routerUsers);
app.use(routerMovies);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден.'));
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка.' : message,
  });
  next();
});
app.listen(PORT);
