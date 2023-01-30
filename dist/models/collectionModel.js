"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Items = require('../models/itemsModel');
const mongoose_1 = require("mongoose");
const collectionSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    topic: String,
    image: Boolean,
    items: [Items],
});
module.exports = (0, mongoose_1.model)('Collection', collectionSchema);
//# sourceMappingURL=collectionModel.js.map