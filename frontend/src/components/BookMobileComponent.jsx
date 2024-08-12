// import React, { useState, useEffect } from "react";
// import "../Styling/css/components/blogPost.css";
// import "../Styling/css/components/card.css";
// import "../Styling/css/components/btn.css";
// import "../Styling/css/components/loader.css";
// import DOMPurify from "dompurify";
// import { handleAddToCart } from "../tools/CartHandlers";
// import { useCart } from "../tools/CartContext";
// import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";

// function BookMobileComponent({ productsData, toggleCart }) {
//   const sanitizedDescription = DOMPurify.sanitize(productsData.description);
//   const sanitizedOtherIngredients = DOMPurify.sanitize(
//     productsData.otherIngredients
//   );
//   const sanitizedWarning = DOMPurify.sanitize(productsData.warning);
//   const autha = useAuthHeader();
//   const isAuth = useIsAuthenticated();
//   const userToken = autha().slice(6);
//   const [currentImage, setCurrentImage] = useState(productsData.firstImage);
//   function handleClick(id) {
//     setCurrentImage(
//       id == 1 ? productsData.firstImage : productsData.secondImage
//     );
//   }
//   const { dispatch } = useCart();

//   return (
//     <div>
//       <div className="single-product-container">
//         <div className="all-img-container-mobile">
//           <div className="normal-img-container">
//             <img src={currentImage} />
//           </div>
//           <div className="alt-img-container-mobile">
//             <ul className="image-ul-mobile">
//               <li
//                 className={
//                   currentImage == productsData.firstImage
//                     ? `small-img-container-mobile active`
//                     : `small-img-container-mobile`
//                 }
//                 onClick={() => {
//                   handleClick(1);
//                 }}
//               >
//                 <img className="small-img" src={productsData.firstImage} />
//               </li>
//               <li
//                 className={
//                   currentImage == productsData.secondImage
//                     ? `small-img-container-mobile active`
//                     : `small-img-container-mobile`
//                 }
//                 onClick={() => {
//                   handleClick(2);
//                 }}
//               >
//                 <img className="small-img" src={productsData.secondImage} />
//               </li>
//             </ul>
//           </div>
//           <div className="title">
//             <div className="border-element">
//               <h2 className="font-semibold">{productsData.title}</h2>
//             </div>
//             <div className="border-element">
//               <ul className="lite-info-ul">
//                 <li className="lite-info-li">
//                   First Available: {productsData.firstAvailable}
//                 </li>
//                 <li className="lite-info-li">
//                   Best By: {productsData.expiryDate}
//                 </li>
//                 <li className="lite-info-li">
//                   Package Quantity: {productsData.quantity} ML
//                 </li>
//                 <li className="lite-info-li">
//                   Shipping Weight: {productsData.weight} Gram
//                 </li>
//               </ul>
//             </div>
//             <div className="price font-bold">
//               Price: {productsData.priceEg} L.E.
//             </div>
//             <button
//               className="cart-btn"
//               onClick={() => {
//                 handleAddToCart(dispatch, userToken, isAuth(), productsData);
//                 toggleCart();
//               }}
//             >
//               add to cart
//             </button>
//           </div>
//         </div>
//         <div className="product-overview-mobile">
//           <div className="overview-title">
//             <h2>Product Overview</h2>
//           </div>
//           <div className="overview-info">
//             <div className="item-row">
//               <h2 className="info-title">Suggested Use</h2>

//               <div className="suggested-use">{productsData.suggestedUse}</div>
//               <h2 className="info-title">Other Ingredients</h2>

//               <div
//                 className="other-ingredients"
//                 dangerouslySetInnerHTML={{ __html: sanitizedOtherIngredients }}
//               />
//               <h2 className="info-title">Description</h2>
//               <div
//                 className="description"
//                 dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
//               />
//               <h2 className="info-title">Warning</h2>
//               <div
//                 className="warning"
//                 dangerouslySetInnerHTML={{ __html: sanitizedWarning }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookMobileComponent;
