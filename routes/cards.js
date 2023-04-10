const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards); //возвращает все карточки
router.post("/cards", createCard); //создаёт карточку
router.delete("/cards/:cardId", deleteCard); //удаляет карточку по _id
router.patch("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
