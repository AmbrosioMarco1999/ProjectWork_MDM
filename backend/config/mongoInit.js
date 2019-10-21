const Pullman = require('../models/pullman')

var pullmans = [
  { targa: 'CA128TD', max_posti: 70, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
  { targa: 'DB94111', max_posti: 40, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
  { targa: 'AA17424', max_posti: 50, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
  { targa: 'EE119CA', max_posti: 70, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
  { targa: 'PI11063', max_posti: 70, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
  { targa: 'PD54715', max_posti: 30, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
  { targa: 'SA88180', max_posti: 50, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
  { targa: 'PD2345B', max_posti: 70, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
  { targa: 'PI2933G', max_posti: 80, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
  { targa: 'RMSUF74', max_posti: 40, allestimento: '', marca: '', modello: '', anno: 2002, active: true },
]

function init() {
  Pullman.findOne({}).then((res) => {
    if (!res) {
      console.log('Inserimento pullmans a db')
      pullmans.forEach((x) => {
        const newPullman = new Pullman({
          targa: x.targa,
          max_posti: x.max_posti,
          allestimento: x.allestimento,
          marca: x.marca,
          modello: x.modello,
          anno: x.anno,
          active: x.active
        });
        newPullman
          .save()
          .then(()=> {
            console.log('Creato pullman targa: ' + x.targa)
          })
          .catch(err => console.log(err));
      })
    }
  })
}

module.exports = init