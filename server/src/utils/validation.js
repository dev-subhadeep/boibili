function isValidISBN(isbn) {
  const isbn10Regex = /^\d{9}(\d|X)$/;
  const isbn13Regex = /^\d{13}$/;
  return isbn10Regex.test(isbn) || isbn13Regex.test(isbn);
}

module.exports = {
  isValidISBN,
};
