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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItemById = exports.getItems = exports.createItem = void 0;
const itemService = __importStar(require("../services/itemService"));
const errorService_1 = require("../services/errorService");
const itemModel_1 = __importDefault(require("../models/itemModel"));
const createItem = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = yield itemService.createItem(Object.assign({}, request.body));
        response.json(newItem);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createItem = createItem;
const getItems = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = request.query;
    let items;
    if (search) {
        items = yield itemModel_1.default.aggregate([
            {
                $search: {
                    index: 'items',
                    text: {
                        query: search,
                        path: { wildcard: '*' },
                        fuzzy: {},
                    },
                },
            },
        ]);
    }
    else {
        const itemId = request.baseUrl.split('/')[2];
        items = yield itemService.findItems({ itemId });
    }
    return response.json(items);
});
exports.getItems = getItems;
const getItemById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield itemService.findItemById(request.params['itemId']);
        response.json(item);
    }
    catch (error) {
        return response.status(404).send((0, errorService_1.createError)(404, 'Item not found!'));
    }
});
exports.getItemById = getItemById;
const updateItem = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedItem = yield itemService.updateItem(request.params['itemId'], Object.assign({}, request.body));
        response.json(updatedItem);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateItem = updateItem;
const deleteItem = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedItem = yield itemService.deleteItemById(request.params['itemId']);
        response.json(deletedItem);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteItem = deleteItem;
//# sourceMappingURL=itemController.js.map