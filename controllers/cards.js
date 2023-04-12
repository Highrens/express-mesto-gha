const ERROR_CODE = 400;
const ERROR_SERVER = 500;
const ERROR_NOT_FOUND = 4040;
const Card = require("../models/card");

//Get возвращает карты
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(ERROR_SERVER).send({ message: "Произошла ошибка" });
    });
};

//Post создает карту
module.exports.createCard = (req, res) => {
  Card.create(
    { name: req.body.name, link: req.body.link, owner: req.user._id },
    { runValidators: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      } else {
        res.status(ERROR_SERVER).send({ message: "Произошла ошибка" });
      }
    });
};
//delete удаляет карту
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ message: "Карточка удалена" });
      } else {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Карточка по указанному _id не найдена" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE).send({ message: "Ошибка: невалидный id" });
      }
      res.status(ERROR_SERVER).send({ message: "Произошла ошибка" });
    });
};
module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send({ card: card.likes });
      } else {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Карточка по указанному _id не найдена" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE).send({ message: "Ошибка: невалидный id" });
      } else {
        res.status(ERROR_SERVER).send({ message: "Произошла ошибка" });
      }

    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send({ card: card.likes });
      } else {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Карточка по указанному _id не найдена" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE).send({ message: "Ошибка: невалидный id" });
      } else {
      res.status(ERROR_SERVER).send({ message: "Произошла ошибка" });
      }
    });
