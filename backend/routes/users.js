const express = require('express');
const router = express.Router();

var users_controller = require('../controllers/usersController');

const ProtectedRoutes = require('../auth/auth');

router.post('/login', users_controller.user_login);

router.post('/register', users_controller.user_register);

router.get('/check', ProtectedRoutes, users_controller.user_token);


module.exports = router;