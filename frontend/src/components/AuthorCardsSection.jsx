import { Link } from "react-router-dom";

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
            <article
              key={author._id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/author/${author._id}`} className="block">
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {author.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {author.bio ? author.bio.slice(0, 80) : ""}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Average Rating:</strong> {author.averageRating} (
                    {author.totalRatings} ratings)
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
