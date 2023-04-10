const Card = require('../models/card');

//Get возвращает карты
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

//Post создает карту
module.exports.createCard = (req, res) => {
  req.user._id
  const { name, link} = req.body;
  Card.create({ name, link, user: req.user._id})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};
//delete удаляет карту
module.exports.deleteCard = (req, res) => {
  Card.findById(req.user._id)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
   { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)