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
    year: Joi.number().integer().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required().regex(/[a-яё0-9.-\s]/i),
    nameEN: Joi.string().required().regex(/[a-z0-9.-\s]/i),
    image: Joi.string().required().regex(/^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpe?g|gif|png|bmp|webp)?$/i),
    trailerLink: Joi.string().required().regex(/^(http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%_+.~#?&/=]+)+\.?(?: mp4|mov|ts|mkv|avi|wmv)?/i),
    thumbnail: Joi.string().required().regex(/^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpe?g|gif|png|bmp|webp)?$/i),
    movieId: Joi.number().integer().required(),
  }),
}), createMovie);
router.get('/movies', getMovies);
router.delete('/movies/:filmId', celebrate({
  params: Joi.object().keys({
    filmId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
