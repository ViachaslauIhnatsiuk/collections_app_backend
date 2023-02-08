"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollection = exports.updateCollection = exports.getCollectionById = exports.getCollections = exports.createCollection = void 0;
const collectionService = __importStar(require("../services/collectionService"));
const errorService_1 = require("../services/errorService");
const createCollection = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyRequestError = (0, errorService_1.checkRequestBody)(request.body, [
        'title',
        'description',
        'topic',
        'imageUrl',
        'ownerId',
        'itemExtraFields',
    ]);
    if (bodyRequestError) {
        return response
            .status(400)
            .send((0, errorService_1.createError)(400, 'bad request: ' + bodyRequestError));
    }
    const { title, description, topic, imageUrl, ownerId, itemExtraFields } = request.body;
    try {
        const newCollection = yield collectionService.createCollection({
            title,
            description,
            topic,
            imageUrl,
            ownerId,
            itemExtraFields,
        });
        response.json(newCollection);
    }
    catch (error) {
        return console.log(error);
    }
});
exports.createCollection = createCollection;
const getCollections = (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield collectionService.findCollections();
        response.json(collections);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCollections = getCollections;
const getCollectionById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield collectionService.findCollectionById(request.params['collectionId']);
        response.json(collection);
    }
    catch (error) {
        return response.status(404).send((0, errorService_1.createError)(404, 'Collection not found!'));
    }
});
exports.getCollectionById = getCollectionById;
const updateCollection = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyRequestError = (0, errorService_1.checkRequestBody)(request.body, [
        'title',
        'description',
        'topic',
        'imageUrl',
    ]);
    if (bodyRequestError) {
        return response
            .status(400)
            .send((0, errorService_1.createError)(400, 'bad request: ' + bodyRequestError));
    }
    const { title, description, topic, imageUrl } = request.body;
    try {
        const updatedCollection = yield collectionService.updateCollection(request.params['collectionId'], { title, description, topic, imageUrl });
        response.json(updatedCollection);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateCollection = updateCollection;
const deleteCollection = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCollection = yield collectionService.deleteCollectionById(request.params['collectionId']);
        response.json(deletedCollection);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteCollection = deleteCollection;
//# sourceMappingURL=collectionController.js.map