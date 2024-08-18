import React from "react";
import "../Styling/css/components/blogPost.css";
import "../Styling/css/components/btn.css";
import WantToRead from "./WantToRead";
import ReadMore from "./ReadMore";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import AuthorCard from "./AuthorCard";
import ReviewCard from "./ReviewCard";
import reviews from "../data/reviewExample.json";
import TotalReviewsOverview from "./TotalReviewsOverview";
function BookNormalComponent({ book }) {
  console.log(book);

  return (
    <div>
      <div className="single-product-container">
        <div className="all-img-container">
          <div className="left-section">
            <div className="normal-img-container">
              <img src={book.thumbnail} />
            </div>
            <div className="">
              <div className="want-to-read">
                <WantToRead />
              </div>
              <div className="py-3">
                <Rating id={book.isbn13} />
              </div>
              <h3 className="ml-2">Rate This Book</h3>
            </div>
          </div>
          <div className="title">
            <div className="border-element">
              <h2 className="font-semibold text-3xl">{book.title}</h2>
            </div>
            <div className="border-element">
              <ul className="lite-info-ul">
                <li className="lite-info-li text-xl">
                  Author: {book.authorId.name || authorId}
                </li>
                <li className="lite-info-li">{book.rating}</li>
                <ReadMore text={book.description} limit={120} />
                <li className="lite-info-li">
                  Genres{" "}
                  {book.categories.map((cat) => {
                    return (
                      <Link
                        className="hover:underline mx-2 font-semibold"
                        to={`/category/${cat._id}`}
                      >
                        {cat.name}{" "}
                      </Link>
                    );
                  })}
                </li>
                <li className="lite-info-li my-2">{book.pageCount} page</li>
                <li className="lite-info-li my-2 ">
                  <span className="mr-5">First Published</span>
                  {book.publishedDate}
                </li>
                <li className="lite-info-li my-2">
                  <span className="mr-5">ISBN</span> {book.isbn13}
                </li>
              </ul>
            </div>
            <div className="product-overview-mobile">
              <div className="overview-title">
                <h2>About the author</h2>
                <AuthorCard authorId={book.authorId.id || book.authorId} />
              </div>
            </div>
            <div className="product-overview-mobile">
              <div className="overview-title">
                <h2 className="text-xl py-4">Reviews & Ratings</h2>
                <div className="py-3">
                  <TotalReviewsOverview reviews={book.reviews} />
                </div>{" "}
                <ReviewCard reviewData={book.reviews} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookNormalComponent;
