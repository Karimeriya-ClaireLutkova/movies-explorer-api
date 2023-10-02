require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DATABASE_URL, PORT } = require('./utils/constants');

const app = express();
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

app.use(cors({
  credentials: true,
  origin: ['https://moviesYP.nomoredomainsrocks.ru'],
}));
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);
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
