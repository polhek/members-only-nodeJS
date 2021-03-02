var express = require('express');
var router = express.Router();
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
const memberController = require('../controllers/memberController');
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', { title: 'Members only', user: req.user });
});

router.get('/sign-up', signupController.signupForm_get);

router.post('/sign-up', signupController.signupForm_post);

router.get('/log-in', loginController.loginForm_get);

router.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

router.get('/log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/member-join', memberController.member_only_GET);

router.post('/member-join', memberController.member_only_POST);

module.exports = router;
