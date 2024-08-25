import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MobileSearchBar = () => {
  const [searchField, setSearchField] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?query=${encodeURIComponent(searchField)}`);
  };

  return (
    <form
      onSubmit={handleSubmitSearch}
      className={`w-full bg-corn-silk p-3 flex justify-center fixed top-[64px] left-0 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <input
        className="w-[60%] lg:w-[70%] bg-Narvik border border-gray-300 rounded-full px-5 py-2"
        onChange={(e) => setSearchField(e.target.value)}
        value={searchField}
        type="text"
        placeholder="Search..."
      />
    </form>
  );
};

export default MobileSearchBar;
