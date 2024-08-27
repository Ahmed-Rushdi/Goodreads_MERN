import React, { useState } from "react";
import SearchBar from "./SearchBar"; // Adjust the import path based on your project structure
import BasicSpinner from "./BasicSpinner";

const SearchContainer = () => {
  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <div className="search-container">
      <SearchBar
        setSearchResults={setSearchResults}
        setLoading={setLoading}
        urls={["/api/books"]}
        className="search-bar-class"
      />
      {loading && <BasicSpinner />}
    </div>
  );
};

export default SearchContainer;
