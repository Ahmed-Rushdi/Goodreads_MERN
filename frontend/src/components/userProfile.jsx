import "../styles/user-profile.css";
import useFetch from "./useFetch";
import UserBook from "./UserBook";
import UserShelf from "./UserShelf";
import PaginationRounded from "./BookPaging";
import { useState } from "react";
import ProfileInfo from "./profileInfo";

const UserProfile = () => {
  const url = 'http://localhost:3000/api/profile';
  const { data, isLoading, error } = useFetch(url, {
    credentials: 'include'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error: {error.message || "An error occurred while fetching data"}</p>;
  } 

  const books = data.books.books || []; 

  if (!books || books.length === 0) {
    return <p>No books available</p>;
  }
  const currentBooks = books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="user-profile">
      <section className="profile-info">
        <ProfileInfo />
      </section>
      <section className="info-shelf">
        <div>
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
