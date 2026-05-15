import { Router } from "express";
import { db, inquiriesTable, insertInquirySchema } from "@workspace/db";

const inquiryRouter = Router();

inquiryRouter.post("/inquiries", async (req, res) => {
  const parsed = insertInquirySchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid request",
      details: parsed.error.issues,
    });
    return;
  }

  const inquiry = await db
    .insert(inquiriesTable)
    .values(parsed.data)
    .returning();

  req.log.info({ id: inquiry[0]?.id }, "New inquiry submitted");

  res.status(201).json({ success: true, id: inquiry[0]?.id });
});

export default inquiryRouter;
