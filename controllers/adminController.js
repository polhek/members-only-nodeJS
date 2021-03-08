const User = require('../models/user');
const dotenv = require('dotenv').config();

const adminPassword = process.env.ADMIN_PASSWORD;

exports.admin_GET = (req, res, next) => {
  res.render('pages/admin', {
    title: 'Become admin!',
    error: false,
    user: req.user,
    password: adminPassword,
  });
};

exports.admin_POST = (req, res, next) => {
  if (req.body.admin_password !== adminPassword) {
    let err = new Error('Wrong admin password!');

    res.render('pages/admin', {
      title: 'Become admin',
      user: req.user,
      error: err,
    });
  } else {
    User.findByIdAndUpdate(req.user._id, { admin: true }, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }
};
