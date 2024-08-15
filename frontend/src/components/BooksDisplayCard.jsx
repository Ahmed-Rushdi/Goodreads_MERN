import React from "react";
import WantToRead from "./WantToRead";
import { Link } from "react-router-dom";

function BooksDisplayCard({ data }) {
  console.log(data);
  return (
    <li key={data.isbn13} className="flex justify-between gap-x-6 py-5 ">
      <div className="flex min-w-0 gap-x-4">
        <Link to={`/book/${data.isbn13}`}>
          <img
            alt="book cover image"
            src={data.thumbnail}
            className="h-20 w-14 flex-none  bg-gray-50"
          />
        </Link>
        <div className="min-w-0 flex-auto">
          {/* <Link to={`/book/${data.isbn13}`}>
            <p className="hover:underline text-sm font-semibold leading-6 text-gray-900">
              {data.title.slice(0, 120)}
            </p>
          </Link> */}
          <Link to={`/author/${data.authorId}`}>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500 hover:underline">
              {data.authorId}
            </p>
          </Link>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <WantToRead isbn={data.isbn13} />
      </div>
    </li>
  );
}

export default BooksDisplayCard;
