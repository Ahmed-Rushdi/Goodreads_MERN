const buildSearchQuery = (model, textQuery = "", findQuery = {}) => {
  if (!query) {
    return model.find(findQuery);
  }
  return model.find({ $text: { $search: textQuery }, ...findQuery });
};

module.exports = buildSearchQuery;
