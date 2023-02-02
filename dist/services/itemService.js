"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemById = exports.updateItem = exports.findItemsByUser = exports.findItems = exports.findItemById = exports.createItem = void 0;
const itemModel_1 = __importDefault(require("../models/itemModel"));
const mongodb_1 = require("mongodb");
const createItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = new itemModel_1.default(data);
    yield newItem.save();
    return newItem;
});
exports.createItem = createItem;
const findItemById = (id) => {
    return itemModel_1.default.findById(new mongodb_1.ObjectId(id));
};
exports.findItemById = findItemById;
const findItems = (data) => {
    return itemModel_1.default.find(data);
};
exports.findItems = findItems;
const findItemsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield itemModel_1.default.find({});
    return items.filter((item) => item.ownerId === userId);
});
exports.findItemsByUser = findItemsByUser;
const updateItem = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = new mongodb_1.ObjectId(id);
    const updatedItem = yield itemModel_1.default.findByIdAndUpdate(itemId, data, { new: true });
    return updatedItem;
});
exports.updateItem = updateItem;
const deleteItemById = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongodb_1.ObjectId(itemId);
    const deletedItem = yield itemModel_1.default.findByIdAndDelete(id);
    return deletedItem;
});
exports.deleteItemById = deleteItemById;
//# sourceMappingURL=itemService.js.map