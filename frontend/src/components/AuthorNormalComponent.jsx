import React from "react";
import "../Styling/css/components/blogPost.css";
import "../Styling/css/components/btn.css";
import ReadMore from "./ReadMore";
import { Link } from "react-router-dom";
import BooksDisplayCard from "./BooksDisplayCard";
function AuthorNormalComponent({ author }) {
  console.log(author);
  let books = [];
  return (
    <div>
      <div className="single-product-container">
        <div className="all-img-container">
          <div className="left-section">
            <div className="normal-img-container">
              <img src={author.image} />
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
              <ul className="lite-info-ul">
                <ReadMore text={author.bio} limit={120} />
                <li className="lite-info-li">Birth Date {author.birthDate}</li>
              </ul>
            </div>

            <h2>Books by the author</h2>
            <BooksDisplayCard data={books} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorNormalComponent;
