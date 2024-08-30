import "../styles/user-book.css";
import BasicModal from "./dropdownMenu";
import BasicRating from "./NoRating";
import ReadMore from "./ReadMore";
import ReviewEditor from "./ReviewEditor";

const UserBook = ({ books }) => {
  // Calculate shelfState based on the books prop
  const shelfState = books.reduce((acc, bookObj) => {
    acc[bookObj.book.isbn13] = bookObj.shelf;
    return acc;
  }, {});

  const updateShelf = (isbn, newShelf) => {
    // Logic to update shelf, if needed.
    // This might involve a callback to the parent component
    // or updating a central state if managed elsewhere.
  };

  return (
    <div>
      <h1>User Books:</h1>
      <ul>
        {books.map((bookObj) => {
          const book = bookObj.book;
          const author = book.authorId;
          const categories = book.categories || [];
          const currentShelf = shelfState[book.isbn13];

          return (
            <li
              className="user-book"
              key={book.isbn13 || Math.random().toString()}
            >
              <div className="book-image">
                <img
                  src={book.thumbnail || "default-thumbnail.jpg"}
                  alt={`${book.title} thumbnail`}
                />
                <div className="book-shelf">
                  <BasicModal
                    isbn={book.isbn13}
                    shelf={currentShelf}
                    onShelfChange={updateShelf}
                  />
                </div>
              </div>
              <div className="book-info">
                <div className="book-header-info">
                  <h2>{book.title || "Title not available"}</h2>
                  <p>by {author ? author.name : "Author not available"}</p>
                  <div className="rating">
                    <p>{book.rating?.toFixed(2) || "N/A"}</p>
                    <BasicRating rating={book.rating || 0} />
                    <p>({book.totalRatings || "No"} ratings)</p>
                  </div>
                </div>
                <br />
                <div className="book-description-info">
                  <ReadMore
                    text={book.description || "Description is not available"}
                    limit={100}
                  />
                </div>
                <br />
                <div className="book-body-info">
                  <p>
                    Published by: {book.publisher || "Publisher not available"}
                  </p>
                  <p>ISBN: {book.isbn13 || "ISBN not available"}</p>
                  <p>Language: {book.language || "Language not available"}</p>
                  <p>
                    Genres:{" "}
                    {categories.map((cat) => cat.name).join(", ") ||
                      "Categories not available"}
                  </p>
                  <p>
                    Page Count: {book.pageCount || "Page count not available"}
                  </p>
                  <p>Shelf: {currentShelf}</p>
                </div>
              </div>
              <div className="book-review-rating">
                <h2>Review this Book</h2>
                <ReviewEditor isbn13={book.isbn13} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserBook;
