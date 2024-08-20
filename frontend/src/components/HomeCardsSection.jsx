import { Link } from "react-router-dom";

export default function HomeCardsSection({ books }) {
  return (
    <div className="bg-light-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trending Now
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Browse the Trending Books, Authors, and Genres
          </p>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((book) => (
            <article
              key={book._id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/book/${book.isbn13}`} className="block">
                <div className="relative">
                  <img
                    className="h-48 w-full object-cover"
                    src={book.thumbnail}
                    alt={book.title}
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-x-2 text-sm">
                    {book.categories.map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/category/${cat._id}`}
                        className="relative z-3 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-200"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <Link to={`/book/${book.isbn13}`}>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm text-gray-500">
                    {book.description.slice(0, 80)}...
                  </p>
                </div>
                <div className="mt-4 flex items-center">
                  <Link to={book.authorId.id}>
                    <p className="text-sm font-medium text-gray-900 hover:bg-gray-500 hover:text-white px-2 py-1 rounded-lg">
                      {book.authorId.name}
                    </p>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
