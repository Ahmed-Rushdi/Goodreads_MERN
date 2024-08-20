import React from "react";
import HomeHeroSection from "../components/HomeHeroSection";
import HomeCardsSection from "../components/HomeCardsSection";
import AuthorCardsSection from "../components/AuthorCardsSection";
import { useFetchData } from "../utils/DataFetching";
import CategoryCardsSection from "../components/CategoryCardSection";

function Home() {
  const {
    data: books,
    loading: booksLoading,
    error: booksError,
  } = useFetchData("/api/trend/trending-books");
  const {
    data: authors,
    loading: authorsLoading,
    error: authorsError,
  } = useFetchData("/api/trend/trending-authors");
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchData("/api/trend/trending-categories");

  if (booksLoading || authorsLoading || categoriesLoading)
    return <p>Loading...</p>;
  if (booksError || authorsError || categoriesError)
    return <p>Error loading data.</p>;

  return (
    <div>
      <HomeHeroSection />
      <div className="bg-corn-silk py-12">
        <div className="container mx-auto px-4">
          <HomeCardsSection books={books} />
        </div>
      </div>
      <div className="bg-light-cream py-12">
        <div className="container mx-auto px-4">
          <AuthorCardsSection authors={authors} />
        </div>
      </div>
      <div className="bg-corn-silk py-12">
        <div className="container mx-auto px-4">
          <CategoryCardsSection categories={categories} />
        </div>
      </div>
    </div>
  );
}

export default Home;
