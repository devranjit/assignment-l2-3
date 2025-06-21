import express from "express";
import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from "mongoose";
import bookRouter from "../src/routes/book.route"; 

const app = express();

app.use(express.json());
app.use("/api", bookRouter);


if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
}

export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
