import React, { useState, useEffect } from "react";
import postData from "../utils/DataPosting";

function Scrape() {
  const [isbn, setIsbn] = useState("");
  const [scrapeEnabled, setScrapeEnabled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const handleCheckboxChange = (e) => {
    setScrapeEnabled(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (scrapeEnabled && isbn) {
      setNotificationMessage("Loading...");
      setNotificationType("loading");
      setShowNotification(true);

      try {
        const resData = await postData("api/books/scrape", { isbn });
        if (resData) {
          setNotificationMessage("Scraping complete!");
          setNotificationType("success");
        } else {
          setNotificationMessage("No data found.");
          setNotificationType("error");
        }
      } catch (error) {
        setNotificationMessage("An error occurred!");
        setNotificationType("error");
      } finally {
        setShowNotification(true);
      }
    }
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="bg-corn-silk min-h-screen flex items-center justify-center p-4">
      <div className="bg-light-cream p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <label className="block text-dark-grey font-bold mb-2" htmlFor="isbn">
            ISBN:
          </label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="w-full p-2 mb-4 border-2 border-olive-green rounded focus:outline-none focus:border-active-nav"
            placeholder="Enter ISBN"
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="scrape"
              checked={scrapeEnabled}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-active-nav focus:ring-olive-green border-gray-300 rounded"
            />
            <label htmlFor="scrape" className="ml-2 text-dark-grey">
              Enable Scraping
            </label>
          </div>

          <button
            type="submit"
            className={`w-full bg-olive-green text-white py-2 px-4 rounded hover:bg-active-nav focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-green ${
              !scrapeEnabled && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!scrapeEnabled}
          >
            Submit
          </button>
        </form>

        {showNotification && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              notificationType === "loading"
                ? "bg-olive-green"
                : notificationType === "error"
                ? "bg-red-500"
                : "bg-tea-green"
            } text-white text-center`}
          >
            {notificationMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Scrape;
