import { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "../src/cors";
import { createBorrow, getBorrowSummary } from "../src/controllers/borrow.controller";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (applyCors(req, res)) return;

  if (req.method === "POST") {
    // @ts-ignore
    await createBorrow(req, res, () => {});
  } else if (req.method === "GET") {
    //@ts-ignore
    await getBorrowSummary(req, res);
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
