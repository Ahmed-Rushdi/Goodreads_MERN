import "../styles/user-profile.css";
import useFetch from "./useFetch";
import UserBook from "./UserBook";
import UserShelf from "./UserShelf";
import PaginationRounded from "./BookPaging";
import { useState, useEffect } from "react";
import ProfileInfo from "./profileInfo";

const UserProfile = () => {
  const [selectedShelf, setSelectedShelf] = useState(''); // Default to no filter, show all books
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const url = selectedShelf ? `http://localhost:3000/api/profile/filter` : `http://localhost:3000/api/profile`;

  const { data, isLoading, error, refetch } = useFetch(url, {
    method: selectedShelf ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: selectedShelf ? JSON.stringify({ returnedShelf: selectedShelf }) : null,
    credentials: 'include'
  });

  useEffect(() => {
    refetch(); // Refetch data when selectedShelf changes
  }, [selectedShelf, refetch]);

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

  const books = data?.books || [];

  if (books.length === 0) {
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
          <UserShelf setSelectedShelf={setSelectedShelf} />
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
