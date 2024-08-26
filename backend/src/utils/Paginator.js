const paginateData = async (query, page, limit) => {
  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 0) {
    throw new Error("Page and limit must be positive integers.");
  }

  const startIndex = (page - 1) * limit;

  let count, data;

  if (typeof query.countDocuments === "function") {
    // Handle Mongoose regular queries
    const cPromise = query.clone().countDocuments();
    const dPromise = query.skip(startIndex).limit(limit);
    [count, data] = await Promise.all([cPromise, dPromise]);
  } else if (typeof query.exec === "function") {
    // Handle Mongoose aggregation queries
    const cPromise = query
      .facet({
        metadata: [{ $count: "total" }],
        data: [{ $skip: startIndex }, { $limit: limit }],
      })
      .exec();

    const result = await cPromise;
    count = result[0]?.metadata[0]?.total || 0;
    data = result[0]?.data || [];
  } else {
    throw new Error("Unsupported query type");
  }

  return {
    data,
    totalItems: count,
    currentPage: page,
    totalPages: limit > 0 ? Math.ceil(count / limit) : 1,
  };
};

module.exports = paginateData;
