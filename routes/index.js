var express = require('express');
var router = express.Router();
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
const memberController = require('../controllers/memberController');
const messagesController = require('../controllers/messageController');
const adminController = require('../controllers/adminController');
const passport = require('passport');

/* GET home page. */
router.get('/', messagesController.getAllMessages);

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

router.get('/new-message', messagesController.new_message_GET);

router.post('/new-message', messagesController.new_message_POST);

router.get('/admin', adminController.admin_GET);

router.post('/admin', adminController.admin_POST);

router.post('/delete', messagesController.deleteMessage_POST);

module.exports = router;
