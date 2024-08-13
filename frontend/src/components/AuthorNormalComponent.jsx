import React from "react";
import "../Styling/css/components/blogPost.css";
import "../Styling/css/components/btn.css";
import ReadMore from "./ReadMore";
import { Link } from "react-router-dom";
import BooksDisplayCard from "./BooksDisplayCard";
function AuthorNormalComponent({ productsData }) {
  console.log(productsData);

  return (
    <div>
      <div className="single-product-container">
        <div className="all-img-container">
          <div className="left-section">
            <div className="normal-img-container">
              <img src={productsData.thumbnail} />
            </div>
            <div className="want-to-read">
              <button className="p-2 border hover:bg-gray-200">
                Follow Author
              </button>
            </div>
          </div>
          <div className="title">
            <div className="border-element">
              <h2 className="font-semibold text-3xl">{productsData.title}</h2>
            </div>
            <div className="border-element">
              <ul className="lite-info-ul">
                <li className="lite-info-li text-xl">
                  Author: {productsData.author}
                </li>
                <ReadMore text={productsData.description} limit={10} />
                <li className="lite-info-li">
                  Genres{" "}
                  {productsData.categories.map((cat) => {
                    return (
                      <Link
                        className="hover:underline mx-2 font-semibold"
                        to={"#"}
                      >
                        {cat}{" "}
                      </Link>
                    );
                  })}
                </li>
                <li className="lite-info-li my-2">
                  {productsData.pageCount} page
                </li>
                <li className="lite-info-li my-2 ">
                  <span className="mr-5">First Published</span>
                  {productsData.publishedDate}
                </li>
                <li className="lite-info-li my-2">
                  <span className="mr-5">ISBN</span> {productsData.isbn13}
                </li>
              </ul>
            </div>

            <h2>Books by the author</h2>
            <BooksDisplayCard data={productsData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorNormalComponent;