import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/book/:id" element={<SingleBookPage />} /> */}
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
    </Router>
  );
}

export default App;
