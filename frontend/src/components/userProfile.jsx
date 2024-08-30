import "../styles/user-profile.css";
import useFetch from "./useFetch";
import UserBook from "./UserBook";
import UserShelf from "./UserShelf";
import PaginationRounded from "./BookPaging";
import { useState, useEffect } from "react";
import ProfileInfo from "./profileInfo";
import BasicSpinner from "./BasicSpinner";

const UserProfile = () => {
  const [selectedShelf, setSelectedShelf] = useState(''); // Default to no filter, show all books
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const itemsPerPage = 4;

  const fetchUrl = selectedShelf ? `http://localhost:3000/api/profile/filter` : `http://localhost:3000/api/profile`;

  const { data, isLoading, error, refetch } = useFetch(fetchUrl, {
    method: selectedShelf ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: selectedShelf ? JSON.stringify({ returnedShelf: selectedShelf }) : null,
    credentials: 'include'
  });

  useEffect(() => {
    console.log(`Fetching data for shelf: ${selectedShelf} with URL: ${fetchUrl}`); // Debugging log
    refetch(); // Refetch data when selectedShelf changes
  }, [selectedShelf, refetch]);

  useEffect(() => {
    if (data && data.books && data.books.length === 0 && selectedShelf) {
      // If no books are found for the selected shelf, show a notification and reset the filter
      showNotification("No books found for the selected shelf. Showing all books.", "error");
      setSelectedShelf(''); // Reset to show all books
    }
  }, [data, selectedShelf]);

  useEffect(() => {
    // Reset to the first page when the selected shelf changes
    setCurrentPage(1);
  }, [selectedShelf]);

  const handlePageChange = (newPage) => {
    console.log(`Changing page to: ${newPage}`);
    setCurrentPage(newPage);
  };

  function showNotification(message, type) {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  }

  if (isLoading) {
    return <BasicSpinner />;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error: {error.message || "An error occurred while fetching data"}</p>;
  }

  const books = data?.books || [];

  // Recalculate currentBooks based on currentPage and itemsPerPage
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentBooks = books.slice(startIdx, startIdx + itemsPerPage);

  console.log(`Current page: ${currentPage}, Showing books:`, currentBooks);

  return (
    <div className="user-profile">
      <section className="profile-info">
        <ProfileInfo />
      </section>
      <section className="info-shelf">
        <div>
          {/* Pass active shelf as a prop */}
          <UserShelf selectedShelf={selectedShelf} setSelectedShelf={setSelectedShelf} />
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

      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 max-w-sm p-4 rounded shadow-lg text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
