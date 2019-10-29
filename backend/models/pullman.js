const mongoose = require('mongoose');

const PullmanSchema = new mongoose.Schema({
  targa: {
    type: String,
    required: true
  },
  max_posti: {
    type: Number,
    default: 70
  },
  allestimento: {
    type: String,
    default: null
  },
  marca: {
    type: String,
    default: false
  },
  modello: {
    type: String,
    default: null
  },
  anno: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: false
  },
  started: {
    type: Boolean,
    default: false
  },
  indexPercorso: {
    type: Number,
    default: null
  }
});

const Pullman = mongoose.model('Pullman', PullmanSchema);

module.exports = Pullman;
