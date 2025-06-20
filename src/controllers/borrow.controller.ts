import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);

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


    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const getBorrowStatsByGenre = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stats = await Borrow.aggregate([
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getBorrowSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

