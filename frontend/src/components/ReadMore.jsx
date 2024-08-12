import React, { useState } from "react";

const ReadMore = ({ text, limit }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="relative">
      <p className="text-gray-800">
        {isReadMore ? `${text.slice(0, limit)}...` : text}
      </p>
      <button onClick={toggleReadMore} className=" text-blue-500">
        {isReadMore ? "Show more" : "Show less"}
      </button>
    </div>
  );
};

export default ReadMore;
