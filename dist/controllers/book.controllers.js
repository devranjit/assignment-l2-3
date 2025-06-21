"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const createBook = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.create(req.body);
        console.log("✅ Book Created:", book);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createBook = createBook;
const getAllBooks = async (req, res, next) => {
    try {
        const filterGenre = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const filter = {};
        if (filterGenre)
            filter.genre = filterGenre;
        const books = await book_model_1.Book.find(filter)
            .sort({ [sortBy]: sortOrder })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await book_model_1.Book.findById(id).select('-__v');
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getBookById = getBookById;
const updateBookById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedBook = await book_model_1.Book.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateBookById = updateBookById;
const deleteBookById = async (req, res, next) => {
    try {
        const { id: bookId } = req.params;
        const book = await book_model_1.Book.findByIdAndDelete(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteBookById = deleteBookById;
const borrowBook = async (req, res, next) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found' });
            return;
        }
        if (book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies to borrow',
            });
            return;
        }
        book.copies -= quantity;
        if (book.copies === 0)
            book.available = false;
        await book.save();
        const borrow = await borrow_model_1.Borrow.create({ book: bookId, quantity, dueDate });
        res.status(200).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.borrowBook = borrowBook;
