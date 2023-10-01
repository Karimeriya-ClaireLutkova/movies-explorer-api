const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.number().integer().required().min(1895).max(2023),
    description: Joi.string().required(),
    nameRU: Joi.string().required().regex(/[я-яё0-9.-]/gi),
    nameEN: Joi.string().required().regex(/[a-z0-9.-]/gi),
    image: Joi.string().required().regex(/^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpe?g|gif|png|bmp|webp)?$/i),
    trailerLink: Joi.string().required().regex(/^(http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%_+.~#?&/=]+)+\.?(?: mp4|mov|ts|mkv|avi|wmv)?/i),
    thumbnail: Joi.string().required().regex(/^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpe?g|gif|png|bmp|webp)?$/i),
    movieId: Joi.number().integer().required(),
  }),
}), createMovie);
router.get('/movies', getMovies);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().integer.required(),
  }),
}), deleteMovie);

module.exports = router;
