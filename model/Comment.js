const mongoose = require('mongoose');
const {model, Schema} = mongoose

const commentSchema = new Schema({
  blogPostId: { type: Schema.Types.ObjectId,
    ref: 'Post' },
  content: { type: String, required: true },
  author: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;