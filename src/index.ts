import express from "express";
import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from "mongoose";
import bookRouter from "../src/routes/book.route"; 
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", bookRouter);


if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
}

export default (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  app(req as any, res as any);
};
