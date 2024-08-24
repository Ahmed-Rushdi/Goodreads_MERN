import React from "react";
import { Link } from "react-router-dom";

export default function MainCard({ type, data }) {
  if (type === "book") {
    return (
      <article
        key={data._id}
        className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300"
      >
        <Link to={`/book/${data.isbn13}`} className="block">
          <div className="relative">
            <img
              className="h-48 w-full object-cover"
              src={data.thumbnail}
              alt={data.title}
            />
          </div>
        </Link>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex-1">
            <div className="flex items-center gap-x-2 text-sm">
              {data.categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat._id}`}
                  className="relative z-3 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-200"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link to={`/book/${data.isbn13}`}>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {data.title}
              </h3>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              {data.description.slice(0, 80)}...
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <Link to={data.authorId.id}>
              <p className="text-sm font-medium text-gray-900 hover:bg-gray-500 hover:text-white px-2 py-1 rounded-lg">
                {data.authorId.name}
              </p>
            </Link>
          </div>
        </div>
      </article>
    );
  } else if (type === "author") {
    return (
      <article
        key={data._id}
        className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300"
      >
        <Link to={`/author/${data._id}`} className="block">
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-lg font-semibold text-gray-900">{data.name}</h3>
            <p className="mt-2 text-sm text-gray-500">
              {data.bio ? data.bio.slice(0, 80) : ""}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <strong>Average Rating:</strong> {data.averageRating} (
              {data.totalRatings} ratings)
            </p>
          </div>
        </Link>
      </article>
    );
  } else if (type === "category") {
    return (
      <article
        key={data._id}
        className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300"
      >
        <Link to={`/category/${data._id}`} className="block">
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-lg font-semibold text-gray-900">{data.name}</h3>
            <p className="mt-2 text-sm text-gray-500">
              <strong>Book Count:</strong> {data.bookCount}
            </p>
          </div>
        </Link>
      </article>
    );
  } else {
    return null;
  }
}
