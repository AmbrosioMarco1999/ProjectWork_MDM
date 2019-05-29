const influx = require('../models/pullmanData');
// Recive data from pullmans
exports.influx_dataPost = async function(req, res) {
    try{
        let data = req.body;
        influx.writePoints([
            {
              measurement: "pullman",
              tags: {                        
              },
              fields: {
                id: data.Id,
                latitudine: data.Latitudine,
                longitudine: data.Longitudine,
                personeABordo: data.PersoneABordo,
                movimento: data.Movimento
              },
            }
          ]).catch(err => {
            res.sendStatus(500);
            console.log(err);
          }).then(result => {
            res.sendStatus(202);
            req.session.destroy();
          });
    }catch(err){
      res.sendStatus(500);
      console.log(err);
    }
}

//test
exports.influx_dataGet = async function(req, res) {
  try{
    influx.query(
      'select * from pullman WHERE id=1 order by time desc limit 1'
      )
      .catch(err=>{
        res.sendStatus(500);
      })
      .then(results=>{
        res.send(results, 202);
    });
  }catch(err){
    res.sendStatus(500);
    console.log(err);
  }
}

