const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/users', (req, res) => {
  const pathUsers = path.join(__dirname, '..', 'data', 'users.json');

  fs.stat(pathUsers, (err) => {
    if (err) {
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      return;
    }

    const readerUsersStream = fs.createReadStream(pathUsers);

    readerUsersStream.on('data', (chunk) => {
      try {
        res.send(JSON.parse(chunk));
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
  });
});

router.get('/users/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      return;
    }

    let dataObject;

    try {
      dataObject = JSON.parse(data);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      return;
    }

    const foundIndexData = dataObject.findIndex((item) => item._id === req.params.id);

    if (foundIndexData !== -1) {
      res.send(dataObject[foundIndexData]);
    } else {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
  });
});

module.exports = router;
