import "../styles/user-profile.css";
import UserBook from "./UserBook";
import UserShelf from "./UserShelf";
import PaginationRounded from "./BookPaging";
import { useState, useEffect, useCallback } from "react";
import ProfileInfo from "./profileInfo";
import { useFetchData } from "../utils/DataFetching";

const UserProfile = () => {
  const [selectedShelf, setSelectedShelf] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const url = `/api/user-book/books${
    selectedShelf ? `?shelf=${selectedShelf}` : ""
  }`;

  const { data, loading, error, refetch } = useFetchData(url);

  const handleShelfChange = useCallback((newShelf) => {
    setSelectedShelf(newShelf);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    refetch();
  }, [selectedShelf, refetch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return (
      <p>Error: {error.message || "An error occurred while fetching data"}</p>
    );
  }

  const books = data?.books || [];

  if (books.length === 0) {
    return <p>No books available</p>;
  }

  const currentBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="user-profile">
      <section className="profile-info">
        <ProfileInfo />
      </section>
      <section className="info-shelf">
        <div>
          <UserShelf
            setSelectedShelf={handleShelfChange}
            currentShelf={selectedShelf}
          />
        </div>
        <div>
          <UserBook key={selectedShelf} books={currentBooks} />
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
