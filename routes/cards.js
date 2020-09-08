const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/cards', (req, res) => {
  const pathCards = path.join(__dirname, '..', 'data', 'cards.json');

  fs.stat(pathCards, (err) => {
    if (err) {
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      return;
    }

    const readerCardsStream = fs.createReadStream(pathCards);

    readerCardsStream.on('data', (chunk) => {
      try {
        res.send(JSON.parse(chunk));
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
  });
});

module.exports = router;
