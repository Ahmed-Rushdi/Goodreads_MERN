import React from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../utils/DataFetching";
import BooksDisplayCard from "../components/BooksDisplayCard";
import BasicSpinner from "../components/BasicSpinner";

function CategoryPage() {
  const { categoryId } = useParams();
  const { data, loading, error } = useFetchData(
    `/api/books/category/${categoryId}`
  );

  if (loading) return <BasicSpinner />;
  if (error) return <p>Error loading books.</p>;

  return (
    <div className="bg-[#FEFAE0] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Books in Category
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Explore the books available in this category.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((book) => (
            <BooksDisplayCard key={book.id} data={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
