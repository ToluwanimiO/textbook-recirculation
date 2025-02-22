// Binary Search function for books
function binarySearchBooks(books, targetTitle) {
    let left = 0;
    let right = books.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let midTitle = books[mid].title.toLowerCase();

        if (midTitle === targetTitle.toLowerCase()) {
            return books[mid]; // Book found
        } else if (midTitle < targetTitle.toLowerCase()) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return null; // Book not found
}

// Export the function so it can be used in other files
module.exports = binarySearchBooks;
