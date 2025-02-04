import React, { useState, useEffect } from 'react';

const SearchPage = ({ initialQuery }) => {
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

            <ul>
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book.book_id}>
                            <h3>{book.title}</h3>
                            <p>{book.authors}</p>
                        </li>
                    ))
                ) : (
                    <p>No books found</p>
                )}
            </ul>
        </div>
    );
};

export default SearchPage;
