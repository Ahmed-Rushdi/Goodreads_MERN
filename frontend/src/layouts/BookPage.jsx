import React, { useEffect, useState } from "react";
import "../styling/css/components/blogPost.css";
import "../styling/css/components/btn.css";
import data from "../data/bookExample.json";
import { useParams } from "react-router-dom";
import BookNormalComponent from "../components/BookNormalComponent";
import BookMobileComponent from "../components/BookMobileComponent";
import { useFetchData } from "../utils/DataFetching";
import BasicSpinner from "../components/BasicSpinner";

export default function BookPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(`/api/books/${id}`);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 775);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <BasicSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No Book data available.</div>;
  }

  return isMobile ? (
    <BookMobileComponent book={data} />
  ) : (
    <BookNormalComponent book={data} />
  );
}
