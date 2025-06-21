"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_route_1 = __importDefault(require("../src/routes/book.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", book_route_1.default);
if (!mongoose_1.default.connection.readyState) {
    mongoose_1.default.connect(process.env.MONGODB_URI)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err));
}
exports.default = (req, res) => {
    app(req, res);
};
