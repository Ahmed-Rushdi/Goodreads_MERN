import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorMobileComponent from "../components/AuthorMobileComponent";
import AuthorNormalComponent from "../components/AuthorNormalComponent";
import { useFetchData } from "../utils/DataFetching";
import BasicSpinner from "../components/BasicSpinner";

export default function AuthorPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(`/api/authors/${id}`);

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
    return <div>No author data available.</div>;
  }

  return isMobile ? (
    <AuthorMobileComponent author={data} />
  ) : (
    <AuthorNormalComponent author={data} />
  );
}
