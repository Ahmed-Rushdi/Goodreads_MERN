import React, { useEffect, useState } from "react";
import "../Styling/css/components/blogPost.css";
import "../Styling/css/components/card.css";
import "../Styling/css/components/btn.css";
import "../Styling/css/components/loader.css";
import data from "../data/bookExample.json";
import { useParams } from "react-router-dom";
import BookNormalComponent from "../components/BookNormalComponent";
// import BookMobileComponent from "../components/BookMobileComponent";
export default function BookPage() {
  const { id } = useParams();
  const [productsData, setProductsData] = useState(data);

  // useEffect(() => {
  //   if (data) {
  //     const products = data.filter((product) => product.id == id);
  //     setProductsData(products);
  //   }
  // }, [data, id]);

  const isMobile = window.innerWidth <= 599;

  // Only render the child component if productsData is not empty
  return productsData.length > 0 ? (
    isMobile ? (
      // <BookMobileComponent productsData={productsData[0]} />
      <BookNormalComponent productsData={productsData[0]} />
    ) : (
      <BookNormalComponent productsData={productsData[0]} />
    )
  ) : null;
}
