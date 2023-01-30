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
const Collection = require('../models/collectionsModel');
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isBlocked: Boolean,
    isAdmin: Boolean,
    language: String,
    theme: String,
    collections: [Collection],
}, { timestamps: true });
userSchema.statics.signup = function (name, email, password, isBlocked = false, language = 'EN', theme = 'light', collections) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!name || !email || !password) {
            throw Error('All fields must be filled');
        }
        if (!validator_1.default.isEmail(email)) {
            throw Error('Email is not valid');
        }
        const exists = yield this.findOne({ email });
        if (exists) {
            throw Error('Email is already in use');
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield this.create({
            name,
            email,
            password: hash,
            isBlocked,
            language,
            theme,
            collections,
        });
        return user;
    });
};
userSchema.statics.signin = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw Error('All fields must be filled');
        }
        const user = yield this.findOne({ email });
        if (!user) {
            throw Error('Incorrect email');
        }
        if (user.isBlocked) {
            throw Error('User is blocked');
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw Error('Incorrect password');
        }
        return user;
    });
};
module.exports = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=userModel.js.map