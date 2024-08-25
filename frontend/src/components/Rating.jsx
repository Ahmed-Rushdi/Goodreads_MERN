import React, { useState } from "react";
import putData from "../utils/DataUpdating";

const Rating = ({ isbn }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async (value) => {
    setRating(value);
    setLoading(true);

    const url = `/api/reviews/${isbn}`;
    const data = { rating: value };

    const result = await putData(url, data);

    if (result.error) {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= (hover || rating) ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          className={`w-6 h-6 cursor-pointer ${
            star <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
          } transition-colors duration-200`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleClick(star)}
        >
          <path d="M12 17.27L18.18 21l-1.45-6.36L22 9.27l-6.36-.55L12 2 8.36 8.72 2 9.27l4.27 5.37L4.82 21z" />
        </svg>
      ))}
      {loading && <p>Saving...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default Rating;
