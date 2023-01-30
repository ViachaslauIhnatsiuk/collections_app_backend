"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({ user: String, text: String, date: String }, { timestamps: true });
const itemSchema = new mongoose_1.Schema({
    id: String,
    title: String,
    tags: [String],
    collection: String,
    user: Boolean,
    comments: [commentSchema],
});
module.exports = (0, mongoose_1.model)('Item', itemSchema);
//# sourceMappingURL=itemModel.js.map