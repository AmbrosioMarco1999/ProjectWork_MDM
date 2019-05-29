var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/indexController');

const { ensureAuthenticated } = require('../config/auth');

router.get('/', index_controller.index_request);

router.get('/dashboard', ensureAuthenticated, index_controller.index_requestDashboard);

router.get('/info', index_controller.index_requestInfo);


module.exports = router;