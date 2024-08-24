import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../utils/AxiosInstance";
import MainCard from "../components/MainCard";

function SearchResultsPage() {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          setLoading(true);

          const urls = [
            `/api/books?limit=12&page=1&query=${query}`,
            `/api/authors?limit=12&page=1&query=${query}`,
            `/api/categories?limit=12&page=1&query=${query}`,
          ];

          const [booksResponse, authorsResponse, categoriesResponse] =
            await Promise.all(urls.map((url) => axiosInstance.get(url)));

          setBooks(booksResponse.data);
          setAuthors(authorsResponse.data);
          setCategories(categoriesResponse.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="px-10 pt-5">Search Results for: "{query}"</h2>
      {books.data.length ? <h2 className="text-center">Books</h2> : " "}{" "}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {books.data.map((book) => (
              <MainCard key={book._id} type="book" data={book} />
            ))}
          </div>
        </div>
      </div>
      {authors.data.length ? <h2 className="text-center">Authors</h2> : " "}{" "}
      <div className=" py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {authors.data.map((author) => (
              <MainCard key={author._id} type="author" data={author} />
            ))}
          </div>
        </div>
      </div>
      {categories.data.length ? (
        <h2 className="text-center">Categories</h2>
      ) : (
        " "
      )}
      <div className=" py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.data.map((category) => (
              <MainCard key={category._id} type="category" data={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
