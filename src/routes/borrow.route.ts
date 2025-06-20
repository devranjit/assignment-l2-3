import express from 'express';
import { createBorrow } from '../controllers/borrow.controller';
import { getBorrowStatsByGenre } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/borrow', createBorrow);
router.get('/borrow/stats/genre', getBorrowStatsByGenre);

export default router;
