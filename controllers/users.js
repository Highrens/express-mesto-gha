const ERROR_CODE = 400;
const ERROR_SERVER = ERROR_SERVER;
const ERROR_NOT_FOUND = 404;
const User = require("../models/user");
// Get запрос возвращает пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
  .then((user) =>{
      res.send({data: user});
  })
  .catch((err) => {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' })
  });
};
//Get ищет ползователя по ID
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) =>{
      if (user) {
        res.send(user);
      } else {
        res.status(ERROR_NOT_FOUND).send({message: "Пользователь по указанному _id не найден"})
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.name == 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некоретный ID' })
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' })
      }
    });
};
//Post Создает пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }, { runValidators: true})
  .then((user) =>{
      res.send(user);
  })
  .catch((err) => {
    console.log(err);
   if (err.name === 'ValidationError')  {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' })
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' })
    }
  });
};
//PATCH /users/me — обновляет профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, about: about }, { runValidators: true, new: true })
  .then((user) =>{
    if (user) {
      res.send(user);
    } else {
      if (err.name === "CastError") {
        res.status(ERROR_CODE).send({ message: "Ошибка невалидный id" });
      } else {
      res.status(ERROR_NOT_FOUND).send({message: "Пользователь по указанному _id не найден"})
      }
    }
  })
  .catch((err) => {
    console.log(err);
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' })
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' })
    }
  });
};
//PATCH /users/me/avatar — обновляет аватар
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  console.log(req.user._id, req.body);
  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { runValidators: true, new: true })
  .then((user) =>{
    if (user) {
      res.send(user);
    } else {
      res.status(ERROR_NOT_FOUND).send({message: "Пользователь по указанному _id не найден"})
    }
  })
  .catch((err) => {
   if (err.name === 'ValidationError')  {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' })
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' })
    }
  });
};