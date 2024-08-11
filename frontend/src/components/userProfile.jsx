import "../styles/user-profile.css";
import useFetch from "./useFetch";
import UserBook from "./UserBook";
import UserShelf from "./UserShelf";
import BookPaging from "./BookPaging";

const UserProfile = () => {
  const url = 'http://localhost:8000/books';  // Adjusted path
  const { data: books, isLoading, error } = useFetch(url);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error("Error fetching data:", error.message); // Log more details
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="user-profile">
      <section className="info-shelf">
        <div className="book-status">
          <UserShelf />
        </div>
        <div>
          <UserBook books={books} />
        </div>
        <BookPaging />
      </section>
    </div>
  );
};

export default UserProfile;
