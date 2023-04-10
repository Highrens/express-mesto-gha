const Card = require("../models/card");

//Get возвращает карты
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

//Post создает карту
module.exports.createCard = (req, res) => {
  Card.create({ name: req.body.name, link: req.body.link, owner: req.user._id })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err._message == "card validation failed") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};
//delete удаляет карту
module.exports.deleteCard = (req, res) => {
  Card.findById(req.user._id)
    .then((card) => {
      if (card) {
        res.status(200).send({ message: "Карточка удалена" });
      } else {
        res
          .status(404)
          .send({ message: "Карточка по указанному _id не найдена" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
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
        res.status(200).send({card: card.likes });
      } else {
        res
          .status(404)
          .send({ message: "Карточка по указанному _id не найдена" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.status(200).send({card: card.likes });
      } else {
        res
          .status(404)
          .send({ message: "Карточка по указанному _id не найдена" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
