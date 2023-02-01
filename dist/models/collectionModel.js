"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
}, { versionKey: false });
exports.default = (0, mongoose_1.model)('ItemsCollection', itemsCollectionSchema);
//# sourceMappingURL=collectionModel.js.map