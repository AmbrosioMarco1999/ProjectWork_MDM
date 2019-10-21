const Pullman = require('../models/pullman')

exports.pullman_get = async function(req, res) {
  var targa = req.query.targa || null;
  if(!targa) {
    Pullman.find().then((results) => {
      res.status(201).send(results);
    }).catch((e) => {
      res.status(500).send(e.message);
    })
  } else {
    Pullman.findOne({targa: targa}).then((results) => {
      res.status(201).send(results);
    }).catch((e) => {
      res.status(500).send(e.message);
    })
  }
}
