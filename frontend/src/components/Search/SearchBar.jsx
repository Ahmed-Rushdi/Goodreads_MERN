import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    navigate(`/search-results?query=${encodeURIComponent(searchField)}`);
  };

  return (
    <form onSubmit={handleSubmitSearch}>
      <input
        className={`rounded-full border border-buff px-3 py-1.5 `}
        onChange={(e) => setSearchField(e.target.value)}
        value={searchField}
        type="text"
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchBar;
