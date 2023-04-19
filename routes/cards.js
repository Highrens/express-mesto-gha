const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards); // возвращает все карточки
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2),
  }).unknown(true),
}), createCard); // создаёт карточку
router.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), deleteCard); // удаляет карточку по _id
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
