import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ownedBooks, setOwnedBooks] = useState([]);
    const [wishlistBooks, setWishlistBooks] = useState([]);
    const [tbrBooks, setTbrBooks] = useState([]);
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
        const storedWishlistBooks = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistBooks(storedWishlistBooks);
        const storedTBRBooks = JSON.parse(localStorage.getItem('tbrBooks')) || [];
        setTbrBooks(storedTBRBooks);
    }, []);

    const fetchBooks = (query) => {
        if (!query) return;
        setLoading(true);
        fetch(`http://localhost:8080/books/search?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                const updatedBooks = data.map((book) => {
                    const userRating = localStorage.getItem(`rating-${book.book_id}`);
                    return { ...book, userRating: userRating || null };
                });
                setBooks(updatedBooks);
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

    const handleAddToWishlist = (book) => {
        const updatedWishlist = [...wishlistBooks, book];
        setWishlistBooks(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const handleRemoveFromWishlist = (book) => {
        const updatedWishlist = wishlistBooks.filter((b) => b.book_id !== book.book_id);
        setWishlistBooks(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const handleAddToTBR = (book) => {
        const updatedTBR = [...tbrBooks, book];
        setTbrBooks(updatedTBR);
        localStorage.setItem('tbrBooks', JSON.stringify(updatedTBR));
    };

    const handleRemoveFromTBR = (book) => {
        const updatedTBR = tbrBooks.filter((b) => b.book_id !== book.book_id);
        setTbrBooks(updatedTBR);
        localStorage.setItem('tbrBooks', JSON.stringify(updatedTBR));
    };

    const isBookOwned = (book) => {
        return ownedBooks.some((b) => b.book_id === book.book_id);
    };

    const isBookInWishlist = (book) => {
        return wishlistBooks.some((b) => b.book_id === book.book_id);
    };

    const isBookInTBR = (book) => {
        return tbrBooks.some((b) => b.book_id === book.book_id);
    };

    const sortedBooks = sortBooks(books);

    return (
        <div class="search-page">
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
                            <div className="book-details">
                                {book.imageUrl && (
                                    <img
                                        src={book.imageUrl}
                                        alt={book.title}
                                        className="book-image"
                                        onClick={() => handleBookClick(book.book_id)}
                                    />
                                )}
                                <div className="book-info">
                                    <div className="book-title" onClick={() => handleBookClick(book.book_id)}>{book.title}</div>
                                    <div className="book-author">{book.authors}</div>
                                    <div className="book-year">{book.publishYear}</div>
                                    <div className="book-rating">Avg Rating: {book.averageRating}</div>
                                    <div className="user-rating">Your Rating: {book.userRating || 'Unrated'} </div>
                                </div>
                            </div>

                            <div className="book-actions">
                                {isBookOwned(book) ? (
                                    <button onClick={() => handleRemoveFromOwnedBooks(book)}>Remove From Owned</button>
                                ) : (
                                    <button onClick={() => handleAddToOwnedBooks(book)}>Add to Owned</button>
                                )}

                                {isBookInWishlist(book) ? (
                                    <button onClick={() => handleRemoveFromWishlist(book)}>Remove from Wishlist</button>
                                ) : (
                                    <button onClick={() => handleAddToWishlist(book)}>Add to Wishlist</button>
                                )}
                                {isBookInTBR(book) ? (
                                    <button onClick={() => handleRemoveFromTBR(book)}>Remove from TBR</button>
                                ) : (
                                    <button onClick={() => handleAddToTBR(book)}>Add to TBR</button>
                                )}
                            </div>
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
