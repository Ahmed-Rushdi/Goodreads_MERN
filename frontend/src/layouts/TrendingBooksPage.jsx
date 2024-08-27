import React from "react";
import BooksDisplayCard from "../components/BooksDisplayCard";
import { useFetchData } from "../utils/DataFetching";
import QueryPagination from "../components/QueryPagination";
import { useLocation } from "react-router-dom";
import BasicSpinner from "../components/BasicSpinner";

function TrendingBooksPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = 10;
  const { data, loading, error } = useFetchData(
    `/api/trend/trending-books?page=${currentPage}&limit=${itemsPerPage}`
  );

  if (loading) {
    return (
      <div className="px-24 py-10">
        <BasicSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="px-24 py-10">Error: {error.message}</div>;
  }

  if (!data.data || data.data.length === 0) {
    return <div className="px-24 py-10">No trending books available.</div>;
  }

  return (
    <div className="px-24">
      <h2 className="text-xl font-semibold text-gray-900 py-10">
        Currently Trending Books
      </h2>
      {data.data.map((book) => (
        <BooksDisplayCard key={book.id} data={book} />
      ))}

      <QueryPagination
        totalItems={data.totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default TrendingBooksPage;
