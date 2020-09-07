const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/users', (req, res) => {
  const readerUsersStream = fs.createReadStream(path.join(__dirname, '..', 'data', 'users.json'));
  readerUsersStream.pipe(res);
});

router.get('/users/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const dataObject = JSON.parse(data);
    const foundIndexData = dataObject.findIndex((item) => item._id === req.params.id);

    if (foundIndexData !== -1) {
      res.send(dataObject[foundIndexData]);
    } else {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
  });
});

module.exports = router;
