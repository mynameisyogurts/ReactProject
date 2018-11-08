const models = require('../models');
const Gamer = models.Gamer;

const makeGamer = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'RAWR! Both name and age are required' });
  }

  const gamerData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  const newGamer = new Gamer.GamerModel(gamerData);

  const gamerPromise = newGamer.save();

  gamerPromise.then(() => res.json({ redirect: '/maker' }));

  gamerPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Game already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return gamerPromise;
};

const makerPage = (req, res) => {
  Gamer.GamerModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeGamer;
