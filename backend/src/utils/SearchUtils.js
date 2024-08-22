const buildSearchQuery = (model, textQuery = "", findQuery = {}) => {
  if (!textQuery) {
    return model.find(findQuery);
  }
  return model.find({ $text: { $search: textQuery }, ...findQuery });
};

module.exports = buildSearchQuery;
