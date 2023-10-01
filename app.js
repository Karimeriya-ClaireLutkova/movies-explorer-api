require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');

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
app.listen(PORT);
