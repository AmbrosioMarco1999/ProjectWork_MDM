const influx = new Influx.InfluxDB('http://127.0.0.1:8086/pullman')

influx.writePoints([
    {
      measurement: 'tide',
      tags: {
        unit: locationObj.rawtide.tideInfo[0].units,
        location: locationObj.rawtide.tideInfo[0].tideSite,
      },
      fields: { height: tidePoint.height },
      timestamp: tidePoint.epoch,
    }
  ], {
    database: 'ocean_tides',
    precision: 's',
  })
  .catch(error => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  });