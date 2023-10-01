const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});
app.listen(PORT);
