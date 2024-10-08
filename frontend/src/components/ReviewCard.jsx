import BasicSpinner from "./BasicSpinner";
import ReadMore from "./ReadMore";
import ReviewReadMore from "./ReviewReadMore";

export default function ReviewCard({ isloading, reviewData }) {
  console.log(reviewData);
  if (isloading) {
    return <BasicSpinner />;
  }
  return (
    <ul role="list" className="divide-y divide-gray-100 bg-warm-neutral">
      {reviewData
        .filter((review) => review.review)
        .map((review) => (
          <li key={review.userId} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={review.imageUrl}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {review.userId.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <ReviewReadMore html={review.review} limit={120} />
                </p>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
