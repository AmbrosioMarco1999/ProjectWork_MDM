const Pullman = require('../models/pullman')
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const config = require('./keys')

var pullmans = [
  { targa: 'CA128TD', max_posti: 70, allestimento: 'Full optional', marca: 'Setra', modello: 'S 416 GT-HD', anno: 2000, active: true },
  { targa: 'DB94111', max_posti: 40, allestimento: 'Full optional', marca: 'Heuliez', modello: 'GX417', anno: 1990, active: true },
  { targa: 'AA17424', max_posti: 50, allestimento: 'Full optional', marca: 'Van Hool', modello: 'A 360 CNG', anno: 2005, active: true },
  { targa: 'EE119CA', max_posti: 70, allestimento: 'Full optional', marca: 'Setra', modello: 'S 416 UL', anno: 2015, active: true },
  { targa: 'PI11063', max_posti: 70, allestimento: 'Full optional', marca: 'Van Hool', modello: 'A 330 Hyb', anno: 2007, active: true },
  { targa: 'PD54715', max_posti: 30, allestimento: 'Full optional', marca: 'Setra', modello: 'S 517 HDH', anno: 2012, active: true },
  { targa: 'SA88180', max_posti: 50, allestimento: 'Full optional', marca: 'Heuliez', modello: 'GX87', anno: 2018, active: true },
  { targa: 'PD2345B', max_posti: 70, allestimento: 'Full optional', marca: 'Van Hool', modello: 'AG 300 Hyb', anno: 2003, active: true },
  { targa: 'PI2933G', max_posti: 80, allestimento: 'Full optional', marca: 'Heuliez', modello: 'GX137', anno: 2008, active: true },
  { targa: 'RMSUF74', max_posti: 40, allestimento: 'Full optional', marca: 'Setra', modello: 'S 515 HDH', anno: 2009, active: true },
]

var adminUser = {
  email: 'admin@trakkabus.it',
  password: 'admin',
  name: 'admin',
  permissionLevel: 1,
  registration_date: Date.now(),
  last_login_date: null,
  active: true
}

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
    } else { console.log('Pullman già a db') }
  })
  User.findOne({ email: adminUser.email }).then(user => {
    if (!user) {
      const newUser = new User( adminUser );
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) { console.log('Errore interno') };
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.log('<=======>');
              console.log('CREATO UTENTE: email: '+ newUser.email +' password: ' + adminUser.password)
              console.log('<=======>');
            })
            .catch(err => console.log(err));
        });
      })
    } else { console.log('Utente admin già a db') }
  })
}

module.exports = init