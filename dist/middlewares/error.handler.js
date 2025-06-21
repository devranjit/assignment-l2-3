"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorDetails = {};
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "validation failed";
        const errors = {};
        for (const field in err.errors) {
            const fieldError = err.errors[field];
            errors[field] = {
                message: fieldError.message,
                name: fieldError.name,
                properties: fieldError.properties,
                kind: fieldError.kind,
                path: fieldError.path,
                value: fieldError.value,
            };
        }
        errorDetails = {
            name: err.name,
            errors,
        };
    }
    else {
        errorDetails = err;
        res.status(statusCode).json({
            message,
            success: false,
            error: errorDetails,
        });
    }
};
exports.errorHandler = errorHandler;
