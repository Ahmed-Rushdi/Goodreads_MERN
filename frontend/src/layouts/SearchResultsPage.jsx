import React from "react";

function SearchResultsPage({ searchResults }) {
  // Display the search results or a message if no results
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {Object.keys(searchResults).length > 0 ? (
          Object.entries(searchResults).map(([url, result], index) => (
            <li key={index}>
              <h3>Results from: {url}</h3>
              <pre>{JSON.stringify(result.data, null, 2)}</pre>
            </li>
          ))
        ) : (
          <h2>No Results Found</h2>
        )}
      </ul>
    </div>
  );
}

export default SearchResultsPage;
