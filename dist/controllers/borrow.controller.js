"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.getBorrowStatsByGenre = exports.createBorrow = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const createBorrow = async (req, res, next) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return;
        }
        if (book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: `Only ${book.copies} copies available`,
            });
            return;
        }
        book.copies -= quantity;
        book.available = book.copies > 0;
        await book.save();
        const borrow = await borrow_model_1.Borrow.create({
            book: bookId,
            quantity,
            dueDate,
        });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createBorrow = createBorrow;
const getBorrowStatsByGenre = async (req, res) => {
    try {
        const stats = await borrow_model_1.Borrow.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'bookDetails',
                },
            },
            { $unwind: '$bookDetails' },
            {
                $group: {
                    _id: '$bookDetails.genre',
                    totalBorrows: { $sum: '$quantity' },
                },
            },
            {
                $project: {
                    genre: '$_id',
                    totalBorrows: 1,
                    _id: 0,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            data: stats,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getBorrowStatsByGenre = getBorrowStatsByGenre;
const getBorrowSummary = async (req, res) => {
    try {
        const summary = await borrow_model_1.Borrow.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'bookDetails',
                },
            },
            { $unwind: '$bookDetails' },
            {
                $group: {
                    _id: '$bookDetails._id',
                    totalQuantity: { $sum: '$quantity' },
                    title: { $first: '$bookDetails.title' },
                    isbn: { $first: '$bookDetails.isbn' },
                },
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$title',
                        isbn: '$isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getBorrowSummary = getBorrowSummary;
