const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      min: 1895,
      max: 2023,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
      validate: /[я-яё0-9\.\-]/gi,
    },
    nameEN: {
      type: String,
      required: true,
      validate: /[a-z0-9\.\-]/gi,
    },
    image: {
      type: String,
      required: true,
      validate: /^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpe?g|gif|png|bmp|webp)?$/i,
    },
    trailerLink: {
      type: String,
      required: true,
      validate: /^(http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&\/\/=]+)+\.?(?: mp4|mov|ts|mkv|avi|wmv)?/i,
    },
    thumbnail: {
      type: String,
      required: true,
      validate: /^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpe?g|gif|png|bmp|webp)?$/i,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
