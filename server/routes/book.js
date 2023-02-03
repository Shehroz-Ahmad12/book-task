import express from "express";
import {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/book.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBook);
router.post("/", addBook);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

export default router;
