import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import TextEditor from "./TextEditor";
import putData from "../utils/DataUpdating";

const ReviewEditor = forwardRef(({ isbn13, initialReview, onSave }, ref) => {
  const [formData, setFormData] = useState(initialReview || "");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const textEditorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (textEditorRef.current && textEditorRef.current.focus) {
        textEditorRef.current.focus();
      }
    },
  }));

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.trim()) {
      const { resData, loading, error } = await putData(
        `/api/reviews/${isbn13}`,
        {
          review: formData,
        }
      );

      if (!loading) {
        if (resData) {
          showNotification("Review submitted successfully!", "success");
          setFormData(""); // Clear form data
          if (textEditorRef.current) {
            textEditorRef.current.clearContent(); // Reset the Quill editor content
          }
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
        <TextEditor
          setPostData={setFormData}
          postData={formData}
          ref={textEditorRef}
        />
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
});

export default ReviewEditor;
