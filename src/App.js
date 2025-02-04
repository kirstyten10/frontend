import React, { useState } from "react";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import BookDetailsPage from './BookDetails';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = (path, book = null) => {
    setCurrentPage(path);
    if (book) {
      setSelectedBook(book);
    }
  };

  return (
    <div>
      {currentPage === 'home' && <HomePage navigate={navigate} />}
      {currentPage === 'search' && <SearchPage navigate={navigate} />}
      {currentPage === 'book-details' && selectedBook && (
        <BookDetailsPage book={selectedBook} navigate={navigate} />
      )}
    </div>
  );
}

export default App;
