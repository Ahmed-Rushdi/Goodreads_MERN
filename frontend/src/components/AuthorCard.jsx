import { Link } from "react-router-dom";
import { useFetchData } from "../utils/DataFetching";
import ReadMore from "./ReadMore";

export default function AuthorCard({ authorId }) {
  console.log(authorId);

  const { data, loading, error } = useFetchData(`/api/authors/${authorId}`);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No author data available.</div>;
  }
  return (
    <ul role="list" className="divide-y divide-gray-300  bg-warm-neutral">
      {
        <li key={data.name} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <Link to={`/author/${authorId}`}>
              <img
                alt="author image"
                src={data.image}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              />
            </Link>
            <div className="min-w-0 flex-auto">
              <Link to={`/author/${authorId}`}>
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {data.name}
                </p>
              </Link>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {data.bookCount == 1
                  ? data.bookCount + " Book"
                  : data.bookCount + " Books"}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">
              <button className="py-2 px-5  hover:bg-gray-100">Follow</button>
            </p>
          </div>
        </li>
      }
      <div className="author-description text-sm py-3">
        <ReadMore text={data.bio} limit={120} />
      </div>
    </ul>
  );
}
