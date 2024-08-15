import React from "react";
import BooksDisplayCard from "../components/BooksDisplayCard";
import { useFetchData } from "../utils/DataFetching";

function TrendingBooksPage() {
  const { data, loading, error } = useFetchData(`api/trend/trending-books`);

  if (loading) {
    return <div className="px-24 py-10">Loading...</div>;
  }

  if (error) {
    return <div className="px-24 py-10">Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="px-24 py-10">No trending books available.</div>;
  }

  return (
    <div className="px-24">
      <h2 className="text-xl font-semibold text-gray-900 py-10">
        Currently Trending Books
      </h2>
      {data.map((book) => (
        <BooksDisplayCard key={book.id} data={book} />
      ))}
    </div>
  );
}

export default TrendingBooksPage;
