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
exports.signIn = exports.signUp = void 0;
const User = require('../models/userModel');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};
const signUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = request.body;
    try {
        const user = yield User.signup(name, email, password);
        const token = createToken(user._id);
        const responseUser = {
            _id: user._id,
            token,
            name,
            email,
            isBlocked: user.isBlocked,
            isAdmin: user.isAdmin,
        };
        response.status(200).json(responseUser);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
exports.signUp = signUp;
const signIn = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    try {
        const user = yield User.signin(email, password);
        const token = createToken(user._id);
        const responseUser = {
            _id: user._id,
            token,
            name: user.name,
            email,
            isBlocked: user.isBlocked,
            isAdmin: user.isAdmin,
        };
        response.status(200).json(responseUser);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
exports.signIn = signIn;
//# sourceMappingURL=authController.js.map