import React, { useState } from "react";
import TextEditor from "./TextEditor";
import postData from "../utils/DataPosting";

function ReviewEditor({ isbn13 }) {
  const [formData, setFormData] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.trim()) {
      const { resData, loading, error } = await postData(
        `/api/reviews/${isbn13}`,
        {
          review: formData,
        }
      );

      if (!loading) {
        if (resData) {
          showNotification("Review submitted successfully!", "success");
        } else if (error) {
          showNotification(
            "Error submitting review. Please try again.",
            "error"
          );
        }
      }
    } else {
      showNotification("Review cannot be empty!", "error");
    }
  }

  function showNotification(message, type) {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextEditor postData={formData} setPostData={setFormData} />
        <button type="submit" className="p-2 mb-8 mt-2 hover:bg-gray-100">
          Submit Review
        </button>
      </form>

      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 max-w-sm p-4 rounded shadow-lg text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default ReviewEditor;
