const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

router.get('/users', getUsers); // возвращает всех пользователей
router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    userid: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), getUserById); // возвращает пользователя по _id
router.post('/users', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), createUser); // создаёт пользователя
router.get('/user/me', celebrate({
  body: Joi.object().keys({
    userid: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), getMe); // Возвращает текущего пользователя
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    userid: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUser); // обновляет профиль
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    userid: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().min(2),
  }).unknown(true),
}), updateUserAvatar); // обновляет аватар

module.exports = router;
