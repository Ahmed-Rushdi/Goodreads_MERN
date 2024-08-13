import { useState } from "react";
import { useParams } from "react-router-dom";
import AuthorMobileComponent from "../components/AuthorMobileComponent";
import AuthorNormalComponent from "../components/AuthorNormalComponent";
import data from "../data/bookExample.json";

export default function AuthorPage() {
  const { id } = useParams();
  const [productsData, setProductsData] = useState(data);
  const isMobile = window.innerWidth <= 599;

  return productsData.length > 0 ? (
    isMobile ? (
      <AuthorMobileComponent productsData={productsData[0]} />
    ) : (
      <AuthorNormalComponent productsData={productsData[0]} />
    )
  ) : null;
}
