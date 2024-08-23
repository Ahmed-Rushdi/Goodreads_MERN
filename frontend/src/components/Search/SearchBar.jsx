import { useState } from "react";
import { axiosInstance } from "../../utils/AxiosInstance";
const SearchBar = ({ setSearchResults, setLoading, urls, className }) => {
  const [searchField, setSearchField] = useState("");

  const handleSubmitSearch = async () => {
    setLoading(true);
    const response = urls.map((url) => {
      const data = axiosInstance.get(url);
      return data;
    });

    const results = await Promise.all(response);
    setSearchResults(
      urls.reduce(
        (acc, url, index) => ({
          ...acc,
          [url]: results[index],
        }),
        {}
      )
    );
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmitSearch}>
      <input
        className={`rounded-full border border-buff px-3 py-1.5 ${className}`}
        onChange={(e) => setSearchField(e.target.value)}
        value={searchField}
        type="text"
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchBar;
