const paginateData = async (model, query, page, limit) => {
  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    throw new Error("Page and limit must be positive integers.");
  }
  const startIndex = (page - 1) * limit;

  const data = await model.find(query).skip(startIndex).limit(limit);
  const count = await model.countDocuments(query);

  if (data.length === 0) {
    throw new Error(`No ${model.modelName} found.`);
  }

  return {
    data,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  };
};
module.exports = { paginateData };
