import React, { useState } from "react";
import "quill/dist/quill.snow.css";

export default function ReviewReadMore({ html, limit }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const text = isExpanded ? html : `${html.substring(0, limit)}...`;

  return (
    <div>
      <p dangerouslySetInnerHTML={{ __html: text }} />
      {html.length > limit && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
