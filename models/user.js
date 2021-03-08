const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: 'Email addres is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: { type: String, required: true },
  membershipStatus: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

UserSchema.virtual('url').get(() => {
  return '/user/' + _id;
});

module.exports = mongoose.model('User', UserSchema);
