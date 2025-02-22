const natural = require("natural");
const { TfIdf } = natural;
const Book = require("../models/Book");

const getSimilarBooks = async (bookId) => {
    const book = await Book.findById(bookId);
    if (!book) return [];

    const allBooks = await Book.find({ _id: { $ne: bookId } });

    let tfidf = new TfIdf();

    // Add book descriptions to TF-IDF
    allBooks.forEach((b) => tfidf.addDocument(b.description));

    let scores = [];
    tfidf.tfidfs(book.description, (i, measure) => {
        scores.push({ book: allBooks[i], score: measure });
    });

    // Sort books by highest similarity score
    scores.sort((a, b) => b.score - a.score);

    return scores.slice(0, 5).map((s) => s.book); // Return top 5 similar books
};

module.exports = getSimilarBooks;
