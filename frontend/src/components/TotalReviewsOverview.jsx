import React from "react";

const TotalReviewsOverview = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  const totalRatings = reviews.length;
  const ratingCounts = Array(5).fill(0);
  const totalStars = reviews.reduce((acc, review) => {
    const roundedRating = Math.round(review.rating);
    ratingCounts[roundedRating - 1]++;
    return acc + review.rating;
  }, 0);
  const averageRating = totalStars / totalRatings;

  return (
    <div className="max-w-md mx-auto p-4 bg-corn-silk rounded-lg shadow-md reviews-counter-card">
      <div className="flex items-center">
        <div className="flex">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <svg
                key={i}
                className={`h-6 w-6 ${
                  i < Math.round(averageRating)
                    ? "reviews-stars"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.425 8.332 1.192-6.041 5.897 1.425 8.305L12 18.897l-7.384 3.909 1.425-8.305L0 9.204l8.332-1.192L12 .587z" />
              </svg>
            ))}
        </div>
        <span className="ml-2 text-xl font-bold">
          {averageRating.toFixed(2)}
        </span>
        <span className="ml-2 text-sm text-gray-500">
          {totalRatings} {totalRatings === 1 ? "rating" : "ratings"}
        </span>
      </div>

      <div className="mt-4">
        {ratingCounts.map((count, index) => {
          const starRating = 5 - index;
          return (
            <div key={starRating} className="flex items-center mb-1">
              <span className="w-16">{starRating} stars</span>
              <div className="relative w-full  h-3 rounded-md">
                <div
                  className="reviews-bar h-3 rounded-md"
                  style={{ width: `${(count / totalRatings) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-700">
                {count} ({((count / totalRatings) * 100).toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TotalReviewsOverview;
