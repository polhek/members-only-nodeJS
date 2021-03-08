const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
});

MessagesSchema.virtual('url').get(() => {
  return '/message/' + _id;
});

MessagesSchema.virtual('time').get(function () {
  return this.timestamp.toUTCString();
});

module.exports = mongoose.model('Message', MessagesSchema);
