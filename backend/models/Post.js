const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  imageUrl: { type: String, required: true },
  date: { type: String, required: true },
  tags: [{ type: String }],
}, {
  timestamps: true
});

// Transform _id to id when converting to JSON to match frontend interface
postSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model('Post', postSchema);