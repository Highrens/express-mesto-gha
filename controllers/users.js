const User = require("../models/user");
// Get запрос возвращает пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
  .then((user) =>{
    if (user) {
      res.status(200).send({data: user});
    }
  })
  .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' })
  });
};
//Get ищет ползователя по ID
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) =>{
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({message: "Пользователь по указанному _id не найден"})
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.name == 'CastError') {
        res.status(400).send({ message: 'Некоретный ID' })
      } else {
        res.status(500).send({ message: 'Произошла ошибка' })
      }
    });
};
//Post Создает пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
  .then((user) =>{
    if (user) {
      res.status(200).send(user);
    }
  })
  .catch((err) => {
    console.log(err);
    if (err._message == 'user validation failed') {
      res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' })
    } else {
      res.status(500).send({ message: 'Произошла ошибка' })
    }
  });
};
//PATCH /users/me — обновляет профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, about: about })
  .then((user) =>{
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({message: "Пользователь по указанному _id не найден"})
    }
  })
  .catch((err) => {
    console.log(err);
    if (err._message == 'user validation failed') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' })
    } else {
      res.status(500).send({ message: 'Произошла ошибка' })
    }
  });
};
//PATCH /users/me/avatar — обновляет аватар
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  console.log(req.user._id, req.body);
  User.findByIdAndUpdate(req.user._id, { avatar: avatar })
  .then((user) =>{
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({message: "Пользователь по указанному _id не найден"})
    }
  })
  .catch((err) => {
    console.log(err);
    if (err._message == 'user validation failed') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' })
    } else {
      res.status(500).send({ message: 'Произошла ошибка' })
    }
  });
};