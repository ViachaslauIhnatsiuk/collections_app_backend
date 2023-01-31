const Items = require('../models/itemsModel');
import { Schema, model } from 'mongoose';

const collectionSchema = new Schema({
  title: String,
  description: String,
  topic: String,
  items: [Items],
});

module.exports = model('Collection', collectionSchema);
