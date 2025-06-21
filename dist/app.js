"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const borrow_route_1 = __importDefault(require("./routes/borrow.route"));
const error_handler_1 = require("./middlewares/error.handler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', book_route_1.default);
app.use('/api', borrow_route_1.default);
app.use(error_handler_1.errorHandler);
app.get('/', (req, res) => {
    res.send('Library Management API Running');
});
exports.default = app;
