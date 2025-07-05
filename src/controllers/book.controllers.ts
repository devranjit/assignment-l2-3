import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';
import mongoose from "mongoose";
import { Borrow } from '../models/borrow.model'; 


export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("[API] Received POST /api/books");
    console.log("[API] Request body:", req.body);

    console.log("[API] Attempting Book.create...");
    const book = await Book.create(req.body);
    console.log("✔️ Book created successfully:", book);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (err) {
    console.error("[API] Error during book creation:", err);
    next(err);
  }
};


export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filterGenre = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;

    const filter: any = {};
    if (filterGenre) filter.genre = filterGenre;

    const books = await Book.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err) {
    next(err);
  }
};



export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).select('-__v');

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
  } catch (err) {
    next(err);
  }
};



export const updateBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
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
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id: bookId } = req.params;
    const book = await Book.findByIdAndDelete(bookId);

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
  } catch (err) {
    next(err);
  }
};

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);

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
    if (book.copies === 0) book.available = false;
    await book.save();

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate }); 
    res.status(200).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};



