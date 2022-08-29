const express = require('express');
const router = express.Router();

// Models
const User = require('../models/user');

// Controllers
const users = require('../controllers/users');

// Middleware
const passport = require('passport');

// Utilities
const catchAsync = require('../utils/catchAsync');

// Routes

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;