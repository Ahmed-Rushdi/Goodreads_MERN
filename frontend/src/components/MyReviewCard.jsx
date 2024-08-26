import React from "react";
import ReadMore from "./ReadMore";
import { useAuth } from "../contexts/AuthenticationContext";
import ReviewReadMore from "./ReviewReadMore";

export default function MyReviewCard({ review, onEditClick }) {
  const { user } = useAuth();

  if (!review) return null;

  return (
    <div className="bg-warm-neutral p-4 mb-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {user.name}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            <ReviewReadMore html={review} limit={120} />
          </p>
        </div>
        <button
          onClick={onEditClick}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
