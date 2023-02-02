"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRequestBody = exports.createError = void 0;
const createError = (statusCode, message) => {
    return { statusCode, message };
};
exports.createError = createError;
const checkRequestBody = (body, keys) => {
    const requestBodyKeys = Object.keys(body);
    if (!requestBodyKeys.length) {
        return 'request body is required';
    }
    for (const key of keys) {
        if (!body.hasOwnProperty(key)) {
            return `${key} is required`;
        }
    }
    if (requestBodyKeys.length > keys.length) {
        const extraProps = requestBodyKeys.filter((prop) => !keys.includes(prop));
        return `values [ ${extraProps.join(',')} ] shouldn't exist`;
    }
    return null;
};
exports.checkRequestBody = checkRequestBody;
//# sourceMappingURL=errorService.js.map