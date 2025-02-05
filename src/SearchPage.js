import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ownedBooks, setOwnedBooks] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            setSearchTerm(query);
            fetchBooks(query);
        }
    }, [location.search]);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        setOwnedBooks(storedBooks);
    }, []);

    const fetchBooks = (query) => {
        if (!query) return;
        setLoading(true);
        fetch(`http://localhost:8080/books/search?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Error fetching books');
                setLoading(false);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate(`/search?query=${searchTerm.trim()}`);
        }
    };

    const handleBookClick = (bookId) => {
        navigate(`/book-details/${bookId}`);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleAddToOwnedBooks = (book) => {
        const updatedBooks = [...ownedBooks, book];
        setOwnedBooks(updatedBooks);
        localStorage.setItem('ownedBooks', JSON.stringify(updatedBooks));
        alert(`${book.title} successfully added to your owned books`);
    };

    const handleRemoveFromOwnedBooks = (book) => {
        const updatedBooks = ownedBooks.filter((b) => b.book_id !== book.book_id);
        setOwnedBooks(updatedBooks);
        localStorage.setItem('ownedBooks', JSON.stringify(updatedBooks));
        alert(`${book.title} has been removed from your owned books`);
    };

    const isBookOwned = (book) => {
        return ownedBooks.some((b) => b.book_id === book.book_id);
    };

    return (
        <div>
            <Navbar />
            <h1>Search Results</h1>

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            <div className="book-container">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book.book_id} className="book-item">
                            {book.imageUrl && (
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="book-image"
                                    onClick={() => handleBookClick(book.book_id)}
                                />
                            )}
                            <div className="book-title">{book.title}</div>
                            {isBookOwned(book) ? (
                                <button onClick={() => handleRemoveFromOwnedBooks(book)}>Remove From Owned</button>
                            ) : (
                                <button onClick={() => handleAddToOwnedBooks(book)}>Add to Owned</button>
                            )}

                        </div>
                    ))
                ) : (
                    <p>No books found for "{searchTerm}"</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
