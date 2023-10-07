require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorsHandlerCentral = require('./middlewares/errors');
const limiter = require('./middlewares/limiter');
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
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandlerCentral);
app.listen(PORT);
