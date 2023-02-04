"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemExtraFieldsSchema = new mongoose_1.Schema({ name: String, type: String });
const itemsCollectionSchema = new mongoose_1.Schema({
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
}, { versionKey: false });
exports.default = (0, mongoose_1.model)('ItemsCollection', itemsCollectionSchema);
//# sourceMappingURL=collectionModel.js.map