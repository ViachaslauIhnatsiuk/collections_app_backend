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
exports.deleteCollectionsByIds = exports.deleteCollectionById = exports.updateCollection = exports.findCollectionsByUser = exports.findCollections = exports.findCollectionById = exports.createCollection = void 0;
const collectionModel_1 = __importDefault(require("../models/collectionModel"));
const mongodb_1 = require("mongodb");
const createCollection = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCollection = new collectionModel_1.default(data);
    yield newCollection.save();
    return newCollection;
});
exports.createCollection = createCollection;
const findCollectionById = (id) => {
    return collectionModel_1.default.findById(new mongodb_1.ObjectId(id));
};
exports.findCollectionById = findCollectionById;
const findCollections = (data) => {
    return collectionModel_1.default.find(data);
};
exports.findCollections = findCollections;
const findCollectionsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield collectionModel_1.default.find({});
    return collections.filter((collection) => collection.ownerId === userId);
});
exports.findCollectionsByUser = findCollectionsByUser;
const updateCollection = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionId = new mongodb_1.ObjectId(id);
    const updatedCollection = yield collectionModel_1.default.findByIdAndUpdate(collectionId, data, {
        new: true,
    });
    return updatedCollection;
});
exports.updateCollection = updateCollection;
const deleteCollectionById = (collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongodb_1.ObjectId(collectionId);
    const deletedCollection = yield collectionModel_1.default.findByIdAndDelete(id);
    return deletedCollection;
});
exports.deleteCollectionById = deleteCollectionById;
const deleteCollectionsByIds = (collectionIds) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCollections = yield collectionModel_1.default.deleteMany({
        _id: { $in: collectionIds },
    });
    return deletedCollections;
});
exports.deleteCollectionsByIds = deleteCollectionsByIds;
//# sourceMappingURL=collectionService.js.map