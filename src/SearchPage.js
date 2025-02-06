import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ownedBooks, setOwnedBooks] = useState([]);
    const [sortOption, setSortOption] = useState('popularity');
    const [sortDirection, setSortDirection] = useState('ascending');
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

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleSortDirectionChange = (event) => {
        setSortDirection(event.target.value);
    };

    const sortBooks = (books) => {
        return books.sort((a, b) => {
            const direction = sortDirection === 'ascending' ? 1 : -1;
            switch (sortOption) {
                case 'popularity':
                    return direction * (b.ratingCount - a.ratingCount);
                case 'averageRating':
                    return direction * (b.averageRating - a.averageRating);
                case 'title':
                    return direction * a.title.localeCompare(b.title);
                case 'publishYear':
                    return direction * (b.publishYear - a.publishYear);
                default:
                    return 0;
            }
        });
    };

    const handleBookClick = (bookId) => {
        navigate(`/book-details/${bookId}`);
    };

    const handleAddToOwnedBooks = (book) => {
        const updatedBooks = [...ownedBooks, book];
        setOwnedBooks(updatedBooks);
        localStorage.setItem('ownedBooks', JSON.stringify(updatedBooks));
    };

    const handleRemoveFromOwnedBooks = (book) => {
        const updatedBooks = ownedBooks.filter((b) => b.book_id !== book.book_id);
        setOwnedBooks(updatedBooks);
        localStorage.setItem('ownedBooks', JSON.stringify(updatedBooks));
    };

    const isBookOwned = (book) => {
        return ownedBooks.some((b) => b.book_id === book.book_id);
    };

    const sortedBooks = sortBooks(books);

    return (
        <div>
            <Navbar />
            <h1>Search Results</h1>

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            <div>
                <label htmlFor="sort">Sort by: </label>
                <select id="sort" value={sortOption} onChange={handleSortChange}>
                    <option value="popularity">Popularity</option>
                    <option value="title">Title</option>
                    <option value="averageRating">Average Rating</option>
                    <option value="publishYear">Year</option>
                </select>
            </div>

            <div>
                <label htmlFor="sortDirection">Sort direction: </label>
                <select id="sortDirection" value={sortDirection} onChange={handleSortDirectionChange}>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>

            <div className="book-container">
                {sortedBooks.length > 0 ? (
                    sortedBooks.map((book) => (
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
                            <div className="book-author">{book.authors}</div>
                            <div className="book-rating">{book.averageRating}</div>
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
