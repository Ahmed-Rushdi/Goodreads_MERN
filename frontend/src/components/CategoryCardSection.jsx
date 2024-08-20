import { Link } from "react-router-dom";

export default function CategoryCardsSection({ categories }) {
  return (
    <div className="bg-light-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trending Categories
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore the most popular categories by book count.
          </p>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category) => (
            <article
              key={category._id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/category/${category._id}`} className="block">
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Book Count:</strong> {category.bookCount}
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
