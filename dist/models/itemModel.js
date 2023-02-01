"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({ user: String, text: String }, { timestamps: true });
const itemSchema = new mongoose_1.Schema({
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
    comments: [commentSchema],
}, { versionKey: false });
exports.default = (0, mongoose_1.model)('Item', itemSchema);
//# sourceMappingURL=itemModel.js.map