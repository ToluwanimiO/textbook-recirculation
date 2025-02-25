const Book = require("../models/Book");
const User = require("../models/User");
const binarySearchBooks = require("../utils/binarySearch");
const getSimilarBooks = require("../utils/similarity");

exports.addBook = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body); // Debugging

    // Validate if the request body is an array
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res
        .status(400)
        .json({ error: "Request body must be a non-empty array of books." });
    }

    // Extract user ID from authentication middleware

    // Validate and process each book entry
    const bookEntries = [];

    for (const book of req.body) {
      const {
        title,
        author,
        subject,
        gradeLevel,
        quantity,
        school,
        donatedBy,
      } = book;

      // Validate required fields
      if (!title || !author || !school || !quantity || quantity < 1) {
        return res
          .status(400)
          .json({
            error:
              "Each book must have title, author, school, and a valid quantity.",
          });
      }

      // Check if the school exists
      const existingSchool = await User.findById(school);
      if (!existingSchool) {
        return res
          .status(404)
          .json({ error: `School with ID ${school} not found.` });
      }

      bookEntries.push({
        title,
        author,
        subject,
        gradeLevel,
        school,
        donatedBy,
        quantity,
        status: "available",
      });
    }

    // Insert all books into the database
    const newBooks = await Book.insertMany(bookEntries);

    res.status(201).json({
      message: "Books added successfully",
      books: newBooks,
    });
  } catch (error) {
    console.error("Error adding books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("donatedBy", "name email").populate("school", "name location");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.claimBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByIdAndUpdate(
      bookId,
      { status: "claimed" },
      { new: true }
    );
    res.status(200).json({ message: "Book claimed successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search for a book using Binary Search
exports.searchBookByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    // Fetch books and sort them alphabetically
    const books = await Book.find().sort({ title: 1 });

    // Apply Binary Search
    const result = binarySearchBooks(books, title);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getRecommendedBooks = async (req, res) => {
  try {
    const { bookId } = req.params;
    const similarBooks = await getSimilarBooks(bookId);
    res.status(200).json({ recommended: similarBooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
