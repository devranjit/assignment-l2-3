import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/book.route';
import borrowRoutes from './routes/borrow.route';
import { errorHandler } from "./middlewares/error.handler";

const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Library Management API Running');
});


app.use('/api', bookRoutes);
app.use('/api', borrowRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
res.send('Library Management API Running');
});

export default app;
