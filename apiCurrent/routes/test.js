var express = require('express');
var router = express.Router();
var test_controller = require('../controllers/testController');

const { ensureAuthenticated } = require('../config/auth');

router.get('/', test_controller.test_main);

router.get('/test', test_controller.test_requestTest);

router.get('/insert', test_controller.test_dbFill);

router.get('/get', test_controller.test_dbGet);

router.get('/error', test_controller.test_error);

router.get('/delete', test_controller.test_deleteUser);

router.get('/request', test_controller.test_modifyRequest);

router.post('/modify', test_controller.test_modify);

router.post('/modifyrequest', test_controller.test_modifyPost);

//router.post('/modify', test_controller.test_modifyPost);

module.exports = router;