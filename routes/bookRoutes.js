const express = require("express");
const { addBook, getAllBooks, claimBook, searchBookByTitle, getRecommendedBooks } = require("../controllers/bookController");

const router = express.Router();

router.post("/", addBook);
router.get("/", getAllBooks);
router.get("/:bookId/recommendations", getRecommendedBooks);
router.put("/:bookId/claim", claimBook);
router.get("/search/:title", searchBookByTitle);  // Binary Search Route

module.exports = router;
