import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const OwnedBooks = () => {
    const [ownedBooks, setOwnedBooks] = useState([]);
    const [sortOption, setSortOption] = useState('popularity');
    const [sortDirection, setSortDirection] = useState('ascending');
    const navigate = useNavigate();

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        setOwnedBooks(storedBooks);
    }, []);

    const handleBookClick = (bookId) => {
        console.log("Navigating to book with ID:", bookId);
        navigate(`/book-details/${bookId}`);
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

    return (
        <div>
            <Navbar />
            <h1>Your Owned Books</h1>

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
                {ownedBooks.length > 0 ? (
                    ownedBooks.map((book) => (
                        <div key={book.book_id} className="book-item">
                            <img src={book.imageUrl}
                                alt={book.title}
                                className="book-image"
                                onClick={() => handleBookClick(book.book_id)}
                            />
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
                    <p>You haven't added any books to your owned list yet.</p>
                )}
            </div>
        </div>
    );
};

export default OwnedBooks;
