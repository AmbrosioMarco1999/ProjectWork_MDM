var express = require('express');
var router = express.Router();
var influx_controller = require('../controllers/influxController');

router.post('/', influx_controller.influx_dataPost);

router.get('/', influx_controller.influx_dataGet);

module.exports = router;