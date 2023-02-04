import { Schema, model } from 'mongoose';

const itemExtraFieldsSchema = new Schema({ name: String, type: String });

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
    itemExtraFields: [itemExtraFieldsSchema],
  },
  { versionKey: false }
);

export default model('ItemsCollection', itemsCollectionSchema);
