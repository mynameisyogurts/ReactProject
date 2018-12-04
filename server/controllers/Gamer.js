const models = require('../models');
const Gamer = models.Gamer;

const makeGamer = (req, res) => {
  if (!req.body.title || !req.body.platform || !req.body.status) {
    return res.status(400).json({ error: 'Dude! Both all fields are required' });
  }

  const gamerData = {
    title: req.body.title,
    platform: req.body.platform,
    status: req.body.status,
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

const getGamer = (request, response) => {
    const req = request;
    const res = response;
    
    return Gamer.GamerModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }
        
        return res.json({ games: docs });
    });
};

const makerPage = (req, res) => {
  Gamer.GamerModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), games: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getGamer = getGamer;
module.exports.make = makeGamer;
