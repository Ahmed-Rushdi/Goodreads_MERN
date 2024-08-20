import React from "react";
import { useFetchData } from "../utils/DataFetching";
import CategoryBooksSection from "../components/CategoryBookSection";

function TrendingCategoriesPage() {
  const {
    data: categories,
    loading,
    error,
  } = useFetchData("/api/trend/trending-categories");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories.</p>;

  return (
    <div className="bg-[#FEFAE0] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Trending Categories
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover the most popular categories and explore the top books in
            each.
          </p>
        </div>
        <div className="mt-12">
          {categories.map((category) => (
            <CategoryBooksSection key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingCategoriesPage;
