import React from "react";
import { useFetchData } from "../utils/DataFetching";
import CategoryBooksSection from "../components/CategoryBookSection";

function TrendingCategoriesPage() {
  const {
    data: trendingCategories,
    loading: trendingLoading,
    error: trendingError,
  } = useFetchData("/api/trend/trending-categories");

  const {
    data: allCategories,
    loading: allCategoriesLoading,
    error: allCategoriesError,
  } = useFetchData("/api/categories");

  if (trendingLoading || allCategoriesLoading) return <p>Loading...</p>;
  if (trendingError) return <p>Error loading trending categories.</p>;
  if (allCategoriesError) return <p>Error loading all categories.</p>;

  // Limit trending categories to the first 10
  const limitedTrendingCategories = trendingCategories.slice(0, 10);

  // Reduce all categories to map names to their corresponding _id
  const categoryLinks = allCategories.data.reduce((acc, category) => {
    acc.push(
      <li key={category._id}>
        <a
          href={`/category/${category._id}`}
          className="text-blue-500 hover:underline"
        >
          {category.name}
        </a>
      </li>
    );
    return acc;
  }, []);

  return (
    <div className="bg-[#FEFAE0] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-dark-grey sm:text-5xl">
            Trending Categories
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover the most popular categories and explore the top books in
            each.
          </p>
        </div>
        <div className="mt-12">
          {limitedTrendingCategories.map((category) => (
            <CategoryBooksSection key={category._id} category={category} />
          ))}
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-dark-grey sm:text-3xl">
            All Categories
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TrendingCategoriesPage;
