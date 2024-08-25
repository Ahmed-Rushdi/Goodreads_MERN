import React from "react";

import { Link } from "react-router-dom";
import { useFetchData } from "../utils/DataFetching";

function CategoryBooksSection({ category }) {
  const {
    data: books,
    loading,
    error,
  } = useFetchData(`/api/books/category/${category._id}`);

  if (loading) return <p>Loading books for {category.name}...</p>;
  if (error) return <p>Error loading books for {category.name}.</p>;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-dark-grey">{category.name}</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.data.map((book) => (
          <article
            key={book._id}
            className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/book/${book.isbn13}`} className="block">
              <div className="relative">
                <img
                  className="h-64 w-full object-cover"
                  src={book.thumbnail}
                  alt={book.title}
                />
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {book.title}
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                {book.description.slice(0, 100)}...
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default CategoryBooksSection;
