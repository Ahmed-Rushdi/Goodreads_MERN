import React from "react";
import BooksDisplayCard from "../components/BooksDisplayCard";
import data from "../data/bookExample.json";
function TrendingBooksPage() {
  return (
    <div className="px-24">
      <h2 className="text-xl font-semibold text-gray-900 py-10">
        Currently Trending Books
      </h2>
      {data.map((book) => {
        return <BooksDisplayCard data={book} />;
      })}
    </div>
  );
}

export default TrendingBooksPage;
