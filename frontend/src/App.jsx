import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
import Navbar from "./components/Navbar";
import BooksDisplay from "./layouts/BooksDisplay";
import BookPage from "./layouts/BookPage";
import AuthorPage from "./layouts/AuthorPage";
import UserProfile from "./components/userProfile";
import TrendingBooksPage from "./layouts/TrendingBooksPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="mt-1.5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchParams" element={<BooksDisplay />} />
          <Route path="/category/:category" element={<BooksDisplay />} />
          <Route path="/trending/:popular" element={<BooksDisplay />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/author/:id" element={<AuthorPage />} />
          <Route path="/currently-trending" element={<TrendingBooksPage />} />
          <Route path="/registration" element={<RegisterPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
