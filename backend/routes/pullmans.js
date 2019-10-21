const express = require('express');
const router = express.Router();

var pullmans_controller = require('../controllers/pullmansController');
// Login Page

const ProtectedRoutes = require('../auth/auth');

router.get('/', pullmans_controller.pullman_get);

module.exports = router;