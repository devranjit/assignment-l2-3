import { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "../src/cors";
import { createBook, getAllBooks } from "../src/controllers/book.controllers";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (applyCors(req, res)) return;

  if (req.method === "POST") {
    // @ts-ignore
    await createBook(req, res, () => {});
  } else if (req.method === "GET") {
    // @ts-ignore
    await getAllBooks(req, res, () => {});
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
