import { Schema, model } from 'mongoose';

const itemsCollectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default model('ItemsCollection', itemsCollectionSchema);
