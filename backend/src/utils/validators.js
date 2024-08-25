function ratingValidator(val) {
  return (val >= 1 && val <= 5) || val === 0;
}
function isbnValidator(val) {
  return /^[0-9]{12}[0-9X]$/.test(val);
}

module.exports = { ratingValidator, isbnValidator };
