const paginateData = async (query, page, limit) => {
  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 0) {
    throw new Error("Page and limit must be positive integers.");
  }
  const startIndex = (page - 1) * limit;

  const data = await query.skip(startIndex).limit(limit);
  const count = await query.countDocuments();

  return {
    data,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  };
};
module.exports = paginateData;
