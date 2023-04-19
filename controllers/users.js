const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const SomethingWrongError = require('../errors/something-wrong-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const User = require('../models/user');
// Get запрос возвращает пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
// Get ищет ползователя по ID
module.exports.getUserById = (req, res, next) => {
  User.findById(req.body.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new SomethingWrongError('Некоретный ID');
      }
    })
    .catch(next);
};
// Post Создает пользователя
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  if (!validator.isEmail(req.body.email)) {
    throw new SomethingWrongError('Переданы некорректные данные при создании пользователя');
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email: req.body.email,
      password: hash,
    })).then((user) => {
      res.send(user);
    })
    .catch(next);
};
// PATCH /users/me — обновляет профиль
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new SomethingWrongError('Переданы некорректные данные при обновлении профиля');
      }
    })
    .catch(next);
};
// PATCH /users/me/avatar — обновляет аватар
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new SomethingWrongError('Переданы некорректные данные при обновлении аватара');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send(token);
    })
    .catch(() => {
      throw new UnauthorizedError('Ошибка авторизации');
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      throw new UnauthorizedError('Ошибка авторизации');
    })
    .catch(next);
};
