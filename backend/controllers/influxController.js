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
                targa: data.Targa,
                latitudine: data.Latitudine,
                longitudine: data.Longitudine,
                personeABordo: data.PersoneABordo,
                movimento: data.Movimento
              },
            }
          ]).catch(err => {
            res.status(500).send();
            console.log(err);
          }).then(result => {
            res.status(202).send();
          });
    }catch(err){
      res.status(500).send();
      console.log(err);
    }
}

//test
exports.influx_dataGet = async function(req, res) {
  try{
    // if(!Number(req.params.targa)) { req.params.targa = 0 }
    influx.query(
      'select * from pullman WHERE targa='+ req.params.targa +' order by time desc limit 1'
      )
      .catch(err=>{
        res.status(500).send();
      })
      .then(results=>{
        res.status(202).send(results);
    });
  }catch(err){
    res.status(500).send();
    console.log(err);
  }
}

exports.influx_getRootDone = async function(req, res) {
  try{
    // if(!Number(req.params.targa)) { req.params.targa = 0 }
    influx.query(
      'select * from pullman WHERE targa='+ req.params.targa +' and started=true order by time asc'
      )
      .catch(err=>{
        res.status(500).send();
      })
      .then(results=>{
        res.status(202).send(results);
    });
  }catch(err){
    res.status(500).send();
    console.log(err);
  }
}