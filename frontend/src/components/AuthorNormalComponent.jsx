import "../styling/css/components/blogPost.css";
import "../styling/css/components/btn.css";
import ReadMore from "./ReadMore";
import { Link } from "react-router-dom";
import BooksDisplayCard from "./BooksDisplayCard";
import { useFetchData } from "../utils/DataFetching";
function AuthorNormalComponent({ author }) {
  const { data, loading, error } = useFetchData(
    `/api/books/author/${author._id}`
  );
  if (!data) {
    return <div>No Book data available.</div>;
  }
  return (
    <div>
      <div className="single-product-container">
        <div className="all-img-container">
          <div className="left-section">
            <div className="normal-img-container">
              <img src={author.image} alt="Author Image" className="border-2" />
            </div>
            <div className="want-to-read">
              <button className="p-2 border hover:bg-gray-200">
                Follow Author
              </button>
            </div>
          </div>
          <div className="title">
            <div className="border-element">
              <h2 className="font-semibold text-3xl">{author.name}</h2>
            </div>
            <div className="border-element">
              {author.bio && (
                <ul className="lite-info-ul">
                  <ReadMore text={author.bio} limit={120} />
                  <li className="lite-info-li">
                    Birth Date:{" "}
                    {author.birthDate
                      ? author.birthDate.slice(0, 10)
                      : "No Info"}
                  </li>
                </ul>
              )}
            </div>
            <h2>Books by the author</h2>
            {data.data.map((book) => {
              return <BooksDisplayCard data={book} key={book.isbn13} />;
            })}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorNormalComponent;
