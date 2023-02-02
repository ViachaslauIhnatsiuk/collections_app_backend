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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.findOneUser = exports.findUsers = exports.findUserById = void 0;
const User = require('../models/userModel');
const mongodb_1 = require("mongodb");
const findUserById = (id) => {
    return User.findById(new mongodb_1.ObjectId(id));
};
exports.findUserById = findUserById;
const findUsers = () => {
    return User.find({});
};
exports.findUsers = findUsers;
const findOneUser = (data) => {
    return User.findOne(data);
};
exports.findOneUser = findOneUser;
const updateUserById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongodb_1.ObjectId(id);
    const updatedUser = yield User.findByIdAndUpdate(userId, data, { new: true });
    return updatedUser;
});
exports.updateUserById = updateUserById;
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongodb_1.ObjectId(userId);
    const deletedUser = yield User.findByIdAndDelete(id);
    return deletedUser;
});
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=userService.js.map