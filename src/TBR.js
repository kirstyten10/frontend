import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const TBR = () => {
    const [tbrBooks, setTbrBooks] = useState([]);
    const [sortOption, setSortOption] = useState('popularity');
    const [sortDirection, setSortDirection] = useState('ascending');
    const [sortedBooks, setSortedBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTBR = JSON.parse(localStorage.getItem('tbrBooks')) || [];
        setTbrBooks(savedTBR);
    }, []);

    useEffect(() => {
        setSortedBooks(sortBooks(tbrBooks));
    }, [tbrBooks, sortOption, sortDirection]);

    const handleBookClick = (bookId) => {
        navigate(`/book-details/${bookId}`);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleSortDirectionChange = (event) => {
        setSortDirection(event.target.value);
    };

    const handleRemoveFromTBR = (book) => {
        const updatedTBR = tbrBooks.filter((b) => b.book_id !== book.book_id);
        setTbrBooks(updatedTBR);
        localStorage.setItem('tbrBooks', JSON.stringify(updatedTBR));
        alert(`${book.title} has been removed from your wishlist`);
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

    return (
        <div>
            <Navbar />
            <h1>Your To Be Read List</h1>
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
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="book-image"
                                onClick={() => handleBookClick(book.book_id)}
                            />
                            <div className="book-title">{book.title}</div>
                            <div className="book-author">{book.authors}</div>
                            <div className="book-rating">{book.averageRating}</div>
                            <button onClick={() => handleRemoveFromTBR(book)}>
                                Remove from TBR
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Your To Be Read list is empty.</p>
                )}
            </div>
        </div>
    );
};

export default TBR;
