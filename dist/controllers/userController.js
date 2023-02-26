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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const mongodb_1 = require("mongodb");
const userService = __importStar(require("../services/userService"));
const collectionService = __importStar(require("../services/collectionService"));
const itemService = __importStar(require("../services/itemService"));
const errorService_1 = require("../services/errorService");
const getUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = request.query.ids;
    const users = yield userService.findUsers();
    const responseUsers = users.map((user) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
        isAdmin: user.isAdmin,
    }));
    if (ids) {
        return response.json(responseUsers.filter((user) => ids.includes(user._id)));
    }
    try {
        response.json(responseUsers);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsers = getUsers;
const getUserById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.findUserById(request.params['id']);
        const responseUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isBlocked: user.isBlocked,
            isAdmin: user.isAdmin,
        };
        response.json(responseUser);
    }
    catch (error) {
        return response.status(404).send((0, errorService_1.createError)(404, 'User not found!'));
    }
});
exports.getUserById = getUserById;
const updateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params['id'];
    const user = yield userService.findUserById(id);
    const { name, email, isBlocked, password, isAdmin } = request.body;
    try {
        const updatedUser = yield userService.updateUserById(id, {
            name,
            email,
            password: password || user.password,
            isBlocked,
            isAdmin,
        });
        response.json(updatedUser);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.id;
        const deletedUser = yield userService.deleteUserById(userId);
        const userCollections = yield collectionService.findCollections({
            ownerId: { $in: [new mongodb_1.ObjectId(userId)] },
        });
        const userItems = yield itemService.findItems({
            ownerId: { $in: [new mongodb_1.ObjectId(userId)] },
        });
        const userCollectionsIds = userCollections.map(({ _id }) => _id);
        const userItemsIds = userItems.map(({ _id }) => _id);
        const deletedCollections = yield collectionService.deleteCollectionsByIds(userCollectionsIds);
        const deletedItems = yield itemService.deleteItemsByIds(userItemsIds);
        response.json([deletedUser, deletedCollections, deletedItems]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map