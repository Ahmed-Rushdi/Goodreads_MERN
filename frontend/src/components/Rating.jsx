import React, { useState, useEffect } from "react";
import putData from "../utils/DataUpdating";
import { useFetchData } from "../utils/DataFetching";
import { useAuth } from "../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const Rating = ({ bookID, isbn }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { data } = useFetchData(
    isLoggedIn ? `/api/reviews/user/${isbn}` : null
  );
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (data?.rating) {
      setRating(data.rating);
    }
  }, [data]);

  const handleRatingUpdate = async (value) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setRating(value);

    try {
      const ratingUrl = `/api/reviews/${isbn}`;
      const ratingData = { rating: value };
      const result = await putData(ratingUrl, ratingData);

      if (result.error) {
        alert(result.error);
        return;
      }
      const shelfUrl = `/api/user-book/${isbn}`;
      const shelfData = { shelf: "read" };
      const shelfResult = await putData(shelfUrl, shelfData);

      if (shelfResult.error) {
        alert(shelfResult.error);
      }
    } catch (error) {
      console.error("Error updating rating or shelf:", error);
    }
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
          onClick={() => handleRatingUpdate(star)}
        >
          <path d="M12 17.27L18.18 21l-1.45-6.36L22 9.27l-6.36-.55L12 2 8.36 8.72 2 9.27l4.27 5.37L4.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
