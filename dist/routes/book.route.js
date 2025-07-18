"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("../controllers/book.controllers");
const book_controllers_2 = require("../controllers/book.controllers");
const book_controllers_3 = require("../controllers/book.controllers");
const book_controllers_4 = require("../controllers/book.controllers");
const borrow_controller_1 = require("../controllers/borrow.controller");
const router = express_1.default.Router();
router.post('/books', book_controllers_1.createBook);
router.get('/books', book_controllers_1.getAllBooks);
router.get('/books/:id', book_controllers_1.getBookById);
router.put('/books/:id', book_controllers_2.updateBookById);
router.delete('/books/:id', book_controllers_3.deleteBookById);
router.post('/books/:id/borrow', book_controllers_4.borrowBook);
router.get('/borrow', borrow_controller_1.getBorrowSummary);
exports.default = router;
