import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            setSearchTerm(query);
            fetchBooks(query);
        }
    }, [location.search]);

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
        console.log("Navigating to book with ID:", bookId);
        navigate(`/book-details/${bookId}`);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleAddToOwnedBooks = (book) => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        const existingBook = storedBooks.find((b) => b.book_id === book.book_id);

        if (existingBook) {
            alert(`${book.title} is already in your owned books`)
        } else {
            storedBooks.push(book);
            localStorage.setItem('ownedBooks', JSON.stringify(storedBooks));
            alert(`${book.title} successfully added to your owned books`)
        }
    };

    return (
        <div>
            <h1>Search Results</h1>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <button onClick={handleBackToHome}>Back to HomePage</button>

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
                            <button onClick={() => handleAddToOwnedBooks(book)}>Add to Owned</button>
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
