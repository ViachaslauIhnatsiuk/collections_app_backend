import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  { user: String, text: String, date: String },
  { timestamps: true }
);

const itemSchema = new Schema({
  id: String,
  title: String,
  tags: [String],
  collection: String,
  user: Boolean,
  comments: [commentSchema],
});

module.exports = model('Item', itemSchema);
