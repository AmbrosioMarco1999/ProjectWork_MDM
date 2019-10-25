var express = require('express');
var router = express.Router();
var influx_controller = require('../controllers/influxController');

router.post('/', influx_controller.influx_dataPost);

router.get('/:id', influx_controller.influx_dataGet);

router.get('/route/:id', influx_controller.influx_getRootDone);

module.exports = router;