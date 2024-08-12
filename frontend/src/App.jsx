import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
import Navbar from "./components/Navbar";
import BooksDisplay from "./layouts/BooksDisplay";
import BookPage from "./layouts/BookPage";
function App() {
  const [count, setCount] = useState(0);

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
          {/* <Route path="/registration" element={<Registration />} /> */}

          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route
          path="/profile"
          element={
            <RequireAuth loginPath="/login">
            <Profile />
            </RequireAuth>
            }
        /> */}
          {/* <Route path="/inquiry" element={<InquiryForm />} />
        <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
