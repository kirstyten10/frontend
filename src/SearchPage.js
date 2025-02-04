import React, { useState, useEffect } from 'react';

const SearchPage = ({ initialQuery, navigate }) => {
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks(searchQuery);
    }, [searchQuery]);

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
        setSearchQuery(searchTerm);
    };

    const handleBookClick = (book) => {
        navigate('book-details', book);
    };

    return (
        <div>
            <h1>Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

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
                                    onClick={() => handleBookClick(book)}
                                />
                            )}
                            <div className="book-title">{book.title}</div>
                        </div>
                    ))
                ) : (
                    <p>No books found</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
