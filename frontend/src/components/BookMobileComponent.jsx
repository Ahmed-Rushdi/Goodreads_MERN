import React from "react";
import "../styling/css/components/blogPost.css";
import "../styling/css/components/btn.css";
import WantToRead from "./WantToRead";
import ReadMore from "./ReadMore";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import AuthorCard from "./AuthorCard";
import ReviewCard from "./ReviewCard";
import TotalReviewsOverview from "./TotalReviewsOverview";
import { useFetchData } from "../utils/DataFetching";
import ReviewEditor from "./ReviewEditor";

function BookMobileComponent({ book }) {
  const { data, loading, error } = useFetchData(
    `/api/reviews/book/${book.isbn13}`
  );
  return (
    <div>
      <div className="single-product-container">
        <div className="all-img-container-mobile">
          <div className="">
            <div className="normal-img-container">
              <img src={book.thumbnail} />
            </div>
            <div className="ratings-mobile-container">
              <div className="want-to-read">
                <WantToRead isbn={book.isbn13} />{" "}
              </div>
              <div className="py-3">
                <Rating isbn={book.isbn13} />
              </div>
              <h3>Rate This Book</h3>
            </div>
          </div>
          <div className="title">
            <div className="border-element">
              <h2 className="font-semibold">{book.title}</h2>
            </div>
            <div className="border-element">
              <ul className="lite-info-ul">
                <li className="lite-info-li text-xl">
                  {book.authorId.name || authorId}
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
                  {book.publishedDate.slice(0, 10)}
                </li>
                <li className="lite-info-li my-2">
                  <span className="mr-5">ISBN</span> {book.isbn13}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="product-overview-mobile">
          <div className="overview-title">
            <h2>About the author</h2>
            <AuthorCard authorId={book.authorId.id || book.authorId} />{" "}
          </div>
        </div>
        <div className="product-overview-mobile">
          <div className="overview-title">
            <h2 className="text-xl py-3">Reviews</h2>
            <div className="py-3">
              <ReviewEditor isbn13={book.isbn13} />
              <TotalReviewsOverview reviews={data} />
            </div>
            <ReviewCard reviewData={book.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookMobileComponent;
