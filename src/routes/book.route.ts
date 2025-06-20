import express from 'express';
import { createBook, getAllBooks, getBookById,  } from '../controllers/book.controllers';
import { updateBookById } from '../controllers/book.controllers';
import { deleteBookById } from '../controllers/book.controllers';
import { borrowBook } from '../controllers/book.controllers';
import { getBorrowSummary } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/books', createBook);
router.get('/books', getAllBooks); 
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBookById);
router.delete('/books/:id', deleteBookById);
router.post('/books/:id/borrow', borrowBook);
router.get('/borrow', getBorrowSummary);



export default router;
