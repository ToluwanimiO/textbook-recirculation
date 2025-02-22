const Book = require("../models/Book");
const binarySearchBooks = require("../utils/binarySearch");
const getSimilarBooks = require("../utils/similarity");

exports.addBook = async (req, res) => {
  try {
    const { title, author, subject, gradeLevel, location, donatedBy } =
      req.body;

    const newBook = new Book({
      title,
      author,
      subject,
      gradeLevel,
      location,
      donatedBy,
    });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("donatedBy", "name email");
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
