import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import BookDetails from './BookDetails';
import OwnedBooks from './OwnedBooks';
import WishList from "./WishList";
import TBR from "./TBR";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book-details/:bookId" element={<BookDetails />} />
          <Route path="/owned-books" element={<OwnedBooks />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/tbr" element={<TBR />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
