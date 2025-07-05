import { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "../../src/cors";
import { getBookById, updateBookById, deleteBookById } from "../../src/controllers/book.controllers";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (applyCors(req, res)) return;

  if (req.method === "GET") {
    // @ts-ignore
    await getBookById(req, res, () => {});
  } else if (req.method === "PUT") {
    // @ts-ignore
    await updateBookById(req, res, () => {});
  } else if (req.method === "DELETE") {
    // @ts-ignore
    await deleteBookById(req, res, () => {});
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
