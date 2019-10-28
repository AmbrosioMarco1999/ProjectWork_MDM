const Influx = require('influx');
const db = require('../config/keys');
const dbname = "test";
const measure = "pullman";

const influx = new Influx.InfluxDB({
    host: db.influxIp,
    database: dbname,
    schema: [
    {
        measurement: measure,
        fields: {
        targa: Influx.FieldType.STRING,
        latitudine: Influx.FieldType.FLOAT,
        longitudine: Influx.FieldType.FLOAT, 
        personeABordo: Influx.FieldType.INTEGER,
        movimento: Influx.FieldType.STRING,
        indexPercorso: Influx.FieldType.INTEGER,
    },
        tags: [
       
        ]
    }
    ]
}); 

module.exports = influx;