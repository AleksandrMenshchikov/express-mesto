const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'карточка не найдена' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'карточка не найдена' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'карточка не найдена' });
      }
      return res.status(500).send({ message: err.message });
    });
};
