function ratingValidator(val) {
  return val >= 0 && val <= 5;
}
function isbnValidator(val) {
  return /^[0-9]{12}[0-9X]$/.test(val);
}

module.exports = { ratingValidator, isbnValidator };
