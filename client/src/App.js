import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home";
import Books from "./pages/Books";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/books" element={<Books />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
