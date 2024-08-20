import React, { useState } from "react";

const ReadMore = ({ text, limit }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const isTextLong = text.length > limit;

  return (
    <div className="relative">
      <p className="text-gray-800">
        {isTextLong && isReadMore ? `${text.slice(0, limit)}...` : text}
      </p>
      {isTextLong && (
        <button onClick={toggleReadMore} className="text-blue-500">
          {isReadMore ? "Show more" : "Show less"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
