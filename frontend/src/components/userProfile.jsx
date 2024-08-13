import "../styles/user-profile.css";
import useFetch from "./useFetch";
import UserBook from "./UserBook";
import UserShelf from "./UserShelf";
import PaginationRounded from "./BookPaging";
import { useState } from "react";

const UserProfile = () => {
  const url = 'http://localhost:8000/books';  // Adjusted path
  const { data: books, isLoading, error } = useFetch(url);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error("Error fetching data:", error.message); // Log more details
    return <p>Error: {error.message}</p>;
  }

  const currentBooks = books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="user-profile">
      <section className="info-shelf">
        <div className="book-status">
          <UserShelf />
        </div>
        <div>
          <UserBook books={currentBooks} />
        </div>
        <PaginationRounded
          totalItems={books.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default UserProfile;