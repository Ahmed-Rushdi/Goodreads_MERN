import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./layouts/Home";
import Navbar from "./components/Navbar";
import BookPage from "./layouts/BookPage";
import AuthorPage from "./layouts/AuthorPage";
import UserProfile from "./components/userProfile";
import TrendingBooksPage from "./layouts/TrendingBooksPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import LoginPage from "./components/LoginPage";
import AdminPage from "./layouts/AdminPage";
import TrendingCategoriesPage from "./layouts/TrendingCategoriesPage";
import SecretQuestion from "./components/SecretQuestion";
import TokenRefresher from "./components/TokenRefresher";
// import { GoogleOAuthProvider } from "@react-oauth/google";

import Test from "./components/Test";
import CategoryPage from "./layouts/CategoryPage";
import SearchResultsPage from "./layouts/SearchResultsPage";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthenticationContext";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 775);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Router>
      <AuthProvider>
        <TokenRefresher>
          <Navbar />
          <div className={isMobile ? "mt-20" : "mt-1.5"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/book/:id" element={<BookPage />} />
              <Route path="/author/:id" element={<AuthorPage />} />
              <Route
                path="/currently-trending"
                element={<TrendingBooksPage />}
              />
              <Route
                path="/trending-categories"
                element={<TrendingCategoriesPage />}
              />
              <Route path="/registration" element={<RegisterPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/test" element={<Test />} />
              <Route path="/secretQuestion" element={<SecretQuestion />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route
                path="/profile"
                element={
                  // <RequireAuth loginPath="/login">
                  <UserProfile />
                  // </RequireAuth>
                }
              />
              {/* <Route path="/inquiry" element={<InquiryForm />} />
          <Route path="/about" element={<About />} /> */}
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
        </TokenRefresher>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;
