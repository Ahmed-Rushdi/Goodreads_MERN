import { Link } from "react-router-dom";
import MainCard from "./MainCard";

export default function HomeCardsSection({ books }) {
  return (
    <div className="bg-light-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark-grey sm:text-4xl">
            Trending Now
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Browse the most Trending Books of the moment.
          </p>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((book) => (
            <MainCard key={book._id} type="book" data={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
