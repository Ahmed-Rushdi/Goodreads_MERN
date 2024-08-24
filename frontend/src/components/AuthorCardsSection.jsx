import { Link } from "react-router-dom";
import MainCard from "./MainCard";

export default function AuthorCardsSection({ authors }) {
  return (
    <div className="bg-light-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trending Authors
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Discover the most popular authors of the moment.
          </p>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {authors.map((author) => (
            <MainCard key={author._id} type="author" data={author} />
          ))}
        </div>
      </div>
    </div>
  );
}
