module.exports = function (fastify, opts, next) {
  fastify.post('/', async (request, reply) => {
    let help = request.body;
    jsonScompatter(help);
    reply.code(204);
  })
  next()
}

function jsonScompatter(data){
  var dati = JSON.parse(data);
  writeOnInflux(dati);
}

const dbname = "test";
const measure = "pullman";
const Influx = require("influx");
const influx = new Influx.InfluxDB({
 host: "192.168.1.5",
 database: dbname,
 schema: [
   {
     measurement: measure,
     fields: {
      id: Influx.FieldType.INTEGER,
      latitudine: Influx.FieldType.FLOAT,
      longitudine: Influx.FieldType.FLOAT, 
      passeggeri: Influx.FieldType.INTEGER,
      movimento: Influx.FieldType.STRING,
     },
     tags: [
       
     ]
   }
 ]
});

function writeOnInflux(data) {
  influx.writePoints([
    {
      measurement: "pullman",
      tags: {                        
      },
      fields: {
        id: data.id,
        latitudine: data.Latitudine,
        longitudine: data.Longitudine,
        passeggeri: data.Passeggeri,
        movimento: data.Movimento
      },
    }
  ]).catch(err => {
    
  }).then();
}