const { body, validationResult } = require('express-validator');

const Message = require('../models/messages');

exports.new_message_GET = (req, res) => {
  res.render('pages/new-message', {
    title: 'New message',
    user: req.user,
    errors: false,
  });
};

exports.new_message_POST = [
  body('message', 'Message must not be empty!')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const newMessage = new Message({
      author: req.user,
      text: req.body.message,
    });

    if (!errors.isEmpty()) {
      res.render('pages/new-message', {
        title: 'New message',
        user: req.user,
        errors: errors,
      });
      return;
    } else {
      newMessage.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    }
  },
];

exports.getAllMessages = (req, res, next) => {
  Message.find({})
    .populate('author')
    .exec((err, messages) => {
      if (err) {
        return next(err);
      } else {
        if (req.user) {
          res.render('pages/index', {
            title: 'Members only',
            user: req.user,
            messagesList: messages,
          });
        } else {
          res.render('pages/index', {
            title: 'Members only',
            user: false,
            messagesList: messages,
          });
        }
      }
    });
};

exports.deleteMessage_POST = (req, res, next) => {
  Message.findByIdAndRemove(
    req.body.id,
    (deleteMessage = (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    })
  );
};
