const paginateData = async (query, page, limit) => {
  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 0) {
    throw new Error("Page and limit must be positive integers.");
  }
  const startIndex = (page - 1) * limit;
  const cPromise = query.clone().countDocuments();
  const dPromise = query.skip(startIndex).limit(limit);

  const [count, data] = await Promise.all([cPromise, dPromise]);

  return {
    data,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  };
};
module.exports = paginateData;
