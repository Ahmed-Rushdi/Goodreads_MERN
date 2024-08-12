import React from "react";
import BooksDisplayCard from "../components/BooksDisplayCard";
import bookData from "../data/bookExample.json";
function BooksDisplay() {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {bookData.map((data) => {
          return <BooksDisplayCard data={data} />;
        })}
      </ul>
    </div>
  );
}

export default BooksDisplay;
