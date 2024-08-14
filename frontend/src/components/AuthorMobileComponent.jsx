
import "../styling/css/components/blogPost.css";
import "../styling/css/components/btn.css";
import ReadMore from "./ReadMore";
import { Link } from "react-router-dom";
import BooksDisplayCard from "./BooksDisplayCard";

function AuthorMobileComponent({ author }) {
  return (
    <div>
      <div className="single-product-container">
        <div className="all-img-container-mobile">
          <div className="author-info">
            <div className="normal-img-container">
              <img src={author.image} />
            </div>
            <button className="p-2 border hover:bg-gray-200">
              Follow Author
            </button>
          </div>
          <div className="title">
            <div className="border-element">
              <h2 className="font-semibold">{author.name}</h2>
            </div>
            <div className="border-element">
              <ul className="lite-info-ul">
                <ReadMore text={author.bio} limit={120} />
                <li className="lite-info-li">Birth Date {author.birthDate}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="product-overview-mobile">
          <div className="overview-title">
            <h2>Books by the author</h2>
            <BooksDisplayCard data={books} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorMobileComponent;
