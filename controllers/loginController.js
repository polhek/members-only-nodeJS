const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const async = require('async');
var bcrypt = require('bcryptjs');
const passport = require('passport');

exports.loginForm_get = (req, res) => {
  res.render('pages/log-in-form', {
    title: 'Log in form',
    user: false,
    errors: false,
  });
};
