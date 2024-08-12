import React from "react";
import WantToRead from "./WantToRead";
import { Link } from "react-router-dom";

function BooksDisplayCard({ data }) {
  console.log(data);
  return (
    <li key={data.isbn13} className="flex justify-between gap-x-6 py-5 mx-24">
      <div className="flex min-w-0 gap-x-4">
        <Link to="#">
          <img
            alt=""
            src={data.thumbnail}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
          />
        </Link>
        <div className="min-w-0 flex-auto">
          <Link to="#">
            <p className="hover:underline text-sm font-semibold leading-6 text-gray-900">
              {data.title.slice(0, 120)}
            </p>
          </Link>
          <Link to="#">
            <p className="mt-1 truncate text-xs leading-5 text-gray-500 hover:underline">
              {data.author}
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
