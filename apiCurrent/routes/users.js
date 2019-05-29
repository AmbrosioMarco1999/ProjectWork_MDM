const express = require('express');
const router = express.Router();

var users_controller = require('../controllers/usersController');
const { forwardAuthenticated } = require('../config/auth');
// Login Page
router.get('/login', forwardAuthenticated, users_controller.user_loginPage);

router.post('/login', users_controller.user_loginPost);

router.get('/logout', users_controller.user_registerPage);

router.post('/logout', users_controller.user_logoutPost);

router.get('/register', forwardAuthenticated, users_controller.user_registerPage);

router.post('/register', users_controller.user_registerPost);

router.get('/captcha', users_controller.user_captcha);

router.get('/password', users_controller.user_changePassword);

router.post('/password', users_controller.user_changePasswordPost);

module.exports = router;