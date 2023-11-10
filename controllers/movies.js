const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    nameRU,
    nameEN,
    image,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;
  const owner = '';
  let imageNew = '';
  const { url } = image.url;
  imageNew = `https://api.nomoreparties.co/${url}`;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    nameRU,
    nameEN,
    imageNew,
    trailerLink,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};
module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};
module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params.filmId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError('Запрашиваемый фильм не найден.');
      }
      if (movie.owner.toString() !== owner) {
        return next(new ForbiddenError('Нет прав на удаление фильма.'));
      }
      return Movie.findByIdAndRemove(req.params.filmId);
    })
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        next(new ValidationError('Переданы некорректные данные при удалении фильма.'));
      } else {
        next(err);
      }
    });
};
