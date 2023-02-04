import { Schema, model } from 'mongoose';

const commentSchema = new Schema({ user: String, text: String }, { timestamps: true });

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    collectionId: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    likes: [String],
    comments: [commentSchema],
  },
  { versionKey: false, strict: false }
);

export default model('Item', itemSchema);
