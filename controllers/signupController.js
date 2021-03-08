const { body, validationResult } = require('express-validator');
const User = require('../models/user');

var bcrypt = require('bcryptjs');

exports.signupForm_get = (req, res) => {
  res.render('pages/sign-up-form', {
    title: 'Sign up form',
    user: false,
    errors: false,
  });
};

exports.signupForm_post = [
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('last_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Last name must be specified.')
    .isAlphanumeric()
    .withMessage('Last name has non-alphanumeric characters.'),
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Username must be specified.')
    .isAlphanumeric()
    .withMessage('Username has non-alphanumeric characters.'),
  body('email')
    .exists()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('The following email was not written correctly.'),
  body('password').exists().withMessage('Password is required.'),
  body('passwordConfirmation')
    .exists()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match!'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('pages/sign-up-form', {
        title: 'Sign up ',
        errors: errors.array(),
      });
      return;
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        const newUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        }).save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      });
    }
  },
];
