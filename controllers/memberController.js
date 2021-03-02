const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const async = require('async');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const dotenv = require('dotenv').config();

const secretPassword = process.env.SECRET_PASSWORD;

exports.member_only_GET = (req, res, next) => {
  res.render('pages/member-subscribe', {
    title: 'Become a member!',
    error: false,
    user: req.user,
    password: secretPassword,
  });
};

exports.member_only_POST = (req, res, next) => {
  if (req.body.secret_password !== secretPassword) {
    let err = new Error('Wrong secret member password!');

    res.render('pages/member-subscribe', {
      title: 'Become a member!',
      user: req.user,
      error: err,
    });
  } else {
    User.findByIdAndUpdate(req.user._id, { membershipStatus: true }, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }
};
