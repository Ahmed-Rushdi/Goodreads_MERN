import React, { useState } from "react";
import SearchBar from "./SearchBar"; // Adjust the import path based on your project structure

const SearchContainer = () => {
  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <div className="search-container">
      <SearchBar
        setSearchResults={setSearchResults}
        setLoading={setLoading}
        urls={["/api/books"]} // Replace with your actual API endpoints
        className="search-bar-class"
      />
      {loading && <p>Loading...</p>}
      {/* Optionally, you can display some search info or history here */}
    </div>
  );
};

export default SearchContainer;
