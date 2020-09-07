const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/cards', (req, res) => {
  const readerCardsStream = fs.createReadStream(path.join(__dirname, '..', 'data', 'cards.json'));
  readerCardsStream.pipe(res);
});

module.exports = router;
