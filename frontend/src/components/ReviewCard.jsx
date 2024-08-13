import ReadMore from "./ReadMore";

export default function ReviewCard({ reviewData }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {reviewData.map((review) => (
        <li key={review.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              alt=""
              src={review.imageUrl}
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {review.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                60 books
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">
              <button>Follow</button>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
