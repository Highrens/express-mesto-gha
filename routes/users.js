const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

router.get('/users', getUsers); // возвращает всех пользователей

router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    userid: Joi.string().hex().required().length(24),
  }),
}), getUserById); // возвращает пользователя по _id

router.get('/user/me', getMe); // Возвращает текущего пользователя

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser); // обновляет профиль

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(([a-zA-Z0-9]+).)+/),
  }),
}), updateUserAvatar); // обновляет аватар

module.exports = router;
